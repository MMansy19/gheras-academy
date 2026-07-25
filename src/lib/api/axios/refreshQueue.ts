/**
 * @file refreshQueue.ts
 * @layer lib/axios
 * @description Queues requests while a token refresh is in progress.
 */

type QueueItem = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

export const refreshQueue = {
  isRefreshing() {
    return isRefreshing;
  },

  setRefreshing(value: boolean) {
    isRefreshing = value;
  },

  enqueue(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  },

  processQueue(error: unknown | null) {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(undefined);
      }
    });
    failedQueue = [];
  },
};
