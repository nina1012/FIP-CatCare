import { describe, expect, it } from 'vitest';

import { careReminderStatus } from '../reminders';
import { sampleCareReminders } from '../sample-reminders';

describe('sampleCareReminders', () => {
  it('shows an overdue, due, upcoming, and finished reminder', () => {
    const reminders = sampleCareReminders({
      cat_id: 'cat-1',
      user_id: 'user-1',
      name: 'Catto',
    });

    expect(
      reminders.map((reminder) => careReminderStatus({ reminder })),
    ).toEqual(['overdue', 'due', 'upcoming', 'done']);
    expect(reminders.every((reminder) => reminder.cat_name === 'Catto')).toBe(
      true,
    );
  });
});
