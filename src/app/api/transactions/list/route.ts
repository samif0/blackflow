import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const table = process.env.TRANSACTIONS_TABLE as string;
  const userId = req.headers.get("x-user-id") || "demo-user";
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const client = new DynamoDBClient({});
  const data = await client.send(
    new QueryCommand({
      TableName: table,
      KeyConditionExpression: "#u = :u and #d >= :d",
      ExpressionAttributeNames: { "#u": "user_id", "#d": "date" },
      ExpressionAttributeValues: {
        ":u": { S: userId },
        ":d": { S: since },
      },
    })
  );

  const items = (data.Items || []).map((it) => ({
    account_id: it.account_id?.S,
    type: it.type?.S,
    iso_currency: it.iso_currency?.S,
    amount: parseFloat(it.amount?.N || "0"),
    date: it.date?.S,
    category: it.category?.S,
    name: it.name?.S,
  }));

  return NextResponse.json({ items });
}
