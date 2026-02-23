export async function POST(req: Request) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      host: 'www.vaphers.com',
      key: '896d6515d7514368895612da711f2ba2',
      keyLocation: 'https://www.vaphers.com/896d6515d7514368895612da711f2ba2.txt',
      urlList: [
        'https://www.vaphers.com'
      ],
    }),
  });

  return new Response(JSON.stringify({ status: 'Submitted' }));
}