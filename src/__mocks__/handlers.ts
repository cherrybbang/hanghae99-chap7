import { rest } from 'msw';

import { events } from '../__mocks__/response/events.json' assert { type: 'json' };
import { Event } from '../types';

export const handlers = [
  rest.get('/api/events', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ events }));
  }),

  rest.post('/api/events', async (req, res, ctx) => {
    const newEvent = (await req.json()) as Event;
    newEvent.id = String(events.length + 1);
    events.push(newEvent);
    return res(ctx.status(201), ctx.json(newEvent));
  }),

  rest.put('/api/events/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updatedEvent = (await req.json()) as Event;
    const index = events.findIndex((event) => event.id === id);

    if (index !== -1) {
      events[index] = { ...events[index], ...updatedEvent };
      return res(ctx.status(200), ctx.json(events[index]));
    }

    return res(ctx.status(404));
  }),

  rest.delete('/api/events/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = events.findIndex((event) => event.id === id);

    if (index !== -1) {
      events.splice(index, 1);
      return res(ctx.status(204));
    }

    return res(ctx.status(404));
  }),
];
