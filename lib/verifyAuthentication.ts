export async function getUsers() {
  const res = await fetch(`http://localhost:3000/api/auth`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}
