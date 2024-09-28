import { http, HttpResponse } from 'msw';

import { generateCat } from '@/testing/data-generators';
const catData = generateCat();

export const catHandlers = [
  // cat data mock
  http.get(
    `http://localhost:5173/app/${catData.cat_id}`,
    async ({ request }) => {
      return HttpResponse.json({ ...request }, { status: 200 });
    },
  ),
];
