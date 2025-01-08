function signup() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });
}

export async function POST() {
  try {
    const res = await signup();
    return Response.json({ res });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
