import { GetServerSideProps } from "next";

interface Item {
  account_id?: string;
  type?: string;
  iso_currency?: string;
  amount?: number;
  date?: string;
  category?: string;
  name?: string;
}

interface Props {
  items: Item[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/list`, {
    headers: { "x-user-id": req.headers["x-user-id"] || "demo-user" },
  });
  const data = await res.json();
  return { props: { items: data.items || [] } };
};

export default function TransactionsPage({ items }: Props) {
  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {items.map((it, idx) => (
          <li key={idx}>{it.date} - {it.name} - {it.amount}</li>
        ))}
      </ul>
    </div>
  );
}
