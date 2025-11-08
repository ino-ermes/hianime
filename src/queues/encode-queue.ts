import { Queue, Worker } from 'bullmq';
import { encodeHLS } from '../utils/encode-hls';
import Episode from '../models/Episode';
import path from 'path';
import { Types } from 'mongoose';
import { io } from '..';

const queueName = 'Encode';

const encodeQueue = new Queue(queueName, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const encodeWorker = new Worker(
  queueName,
  async (job) => {
    const episodeId: Types.ObjectId = job.data._id;
    const uniqueEpisodeId = episodeId.toString() + '-' + Date.now();
    try {
      await encodeHLS(
        job.data.path,
        path.join(__dirname, '..', '..', 'public', uniqueEpisodeId)
      );
      await Episode.updateOne(
        { _id: job.data._id },
        { path: `/public/${uniqueEpisodeId}/master.m3u8`, rendering: false }
      );
      io.emit(
        'rendered',
        episodeId.toString(),
        `/public/${uniqueEpisodeId}/master.m3u8`
      );
    } catch {
      await Episode.updateOne(
        { _id: job.data._id },
        { path: '', rendering: false }
      );
      io.emit('rendered', episodeId.toString(), ``);
    }
  },
  {
    connection: {
      host: 'localhost',
      port: 6379,
    },
  }
);

export default encodeQueue;
