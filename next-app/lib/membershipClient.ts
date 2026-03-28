type MembershipStatusResponse = {
  active?: boolean;
};

export async function fetchMembershipStatus(): Promise<boolean> {
  try {
    const response = await fetch('/api/membership-status', {
      method: 'GET',
      credentials: 'same-origin',
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as MembershipStatusResponse;
    return Boolean(data.active);
  } catch {
    return false;
  }
}