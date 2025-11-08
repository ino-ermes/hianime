import path from 'path';
import { $, usePowerShell } from 'zx';
usePowerShell();

export const getVideoDuration = async (input: string) => {
  const { stdout } =
    await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${slash(
      input
    )}`;
  return stdout.trim().substring(0, 8);
};

const getVideoResolution = async (input: string) => {
  const { stdout } =
    await $`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${slash(
      input
    )}`;
  const [width, height] = stdout.trim().split('x').map(Number);
  return { width, height };
};

export const encodeHLS = async (input: string, outDir: string) => {
  const { width, height } = await getVideoResolution(input);

  const outputSegmentPath = path.join(outDir, 'v%v/file%d.ts');
  const outputPath = path.join(outDir, 'v%v/index.m3u8');

  const resolutions = [
    { width: 480, height: 360, maxrate: '600k', audio: '64k', name: '360p' },
    { width: 640, height: 480, maxrate: '900k', audio: '128k', name: '480p' },
    { width: 1280, height: 720, maxrate: '900k', audio: '128k', name: '720p' },
    {
      width: 1920,
      height: 1080,
      maxrate: '1200k',
      audio: '192k',
      name: '1080p',
    },
  ];

  const selectedResolutions = resolutions.filter(
    (res) => res.width <= width && res.height <= height
  );

  if (selectedResolutions.length == 0)
    throw new Error('video quality is too low');

  const mapOptions = selectedResolutions
    .map(() => `-map 0:v:0 -map 0:a:0`)
    .join(' ');
  const filterOptions = selectedResolutions
    .map(
      (res, i) =>
        `-filter:v:${i} scale=w=${res.width}:h=${res.height} -maxrate:v:${i} ${res.maxrate} -b:a:${i} ${res.audio}`
    )
    .join(' ');
  const varStreamMap = selectedResolutions
    .map((res, i) => `v:${i},a:${i},name:${res.name}`)
    .join(' ');

  const args =
    `-i ${slash(input)} ` +
    mapOptions +
    ' ' +
    '-c:v libx264 -crf 22 -c:a aac -ar 48000 ' +
    filterOptions +
    ' ' +
    `-var_stream_map "${varStreamMap}" ` +
    '-preset slow -hls_list_size 0 -threads 0 -f hls -hls_playlist_type event -hls_time 3 ' +
    '-hls_flags independent_segments -master_pl_name "master.m3u8" ' +
    `-hls_segment_filename ${slash(outputSegmentPath)} ${slash(outputPath)}`;

  console.log(args);

  await $`ffmpeg ${args.split(' ')}`;
};

const slash = (path: string): string => {
  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
};
