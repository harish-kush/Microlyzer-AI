const gatewayUrl = process.env.GATEWAY_URL || "http://localhost:5000";

async function main() {
  const response = await fetch(`${gatewayUrl.replace(/\/+$/, "")}/health`);
  const health = await response.json();

  console.log(JSON.stringify(health, null, 2));

  const services = health.services || {};
  const downServices = Object.entries(services)
    .filter(([, result]) => result.status === "down")
    .map(([name]) => name);

  if (!response.ok || downServices.length > 0) {
    console.error(`Down services: ${downServices.join(", ") || "gateway"}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`Health check failed: ${err.message}`);
  process.exit(1);
});
