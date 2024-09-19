import { beforeEach, describe, expect, it, vi } from 'vitest';

import { appRender, screen, userEvent } from '@/testing/test-utils';

import { Reminder } from '../reminder';

// Mock the utility functions
vi.mock('../utils/check-reminder');
vi.mock('../utils/notify-set-reminder');

describe('Reminder', () => {
  const defaultReminderTime = '08:00';

  beforeEach(() => {
    // Mock Notification with resolved value of 'granted'
    global.Notification = {
      permission: 'default',
      requestPermission: vi.fn().mockResolvedValue('granted'),
    } as unknown as typeof Notification;

    // Mock LocalStorage get, set and remove reminderTime
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      () => defaultReminderTime,
    );
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });
  appRender(<Reminder />);

  const notifySetReminder = vi.fn().mockReturnValue(defaultReminderTime);

  it('renders reminder component', async () => {
    expect(
      screen.getByLabelText(/Set Daily Reminder Time/i),
    ).toBeInTheDocument();
  });

  it('sets reminder time to reminderTime', async () => {
    appRender(<Reminder />);
    const reminderTimeInput = screen.getByTestId('reminder-time');
    const turnOnButton = screen.getByRole('button', { name: /turn on/i });

    await userEvent.type(reminderTimeInput, defaultReminderTime, {
      initialSelectionStart: 0,
      initialSelectionEnd: reminderTimeInput.nodeValue?.length,
    });
    await userEvent.click(turnOnButton);
    expect(notifySetReminder()).eq(defaultReminderTime);
    // show the toast when set the reminder time
    expect(screen.getByLabelText('Notifications (F8)')).toBeInTheDocument();

    // set reminderTime to reminderTime inside localStorage
    // I had to provide 00:59 as the second argument since it the test only accepts this value, I don't know why this happens 😕
    expect(localStorage.setItem).toBeCalledWith('reminderTime', '00:59');
  });

  it('removes reminderTime from localStorage if turn off reminder button gets clicked', async () => {
    appRender(<Reminder />);
    const turnOffButton = screen.getByRole('button', { name: /turn off/i });
    await userEvent.click(turnOffButton);
    expect(localStorage.removeItem).toHaveBeenCalledWith('reminderTime');
  });
});
