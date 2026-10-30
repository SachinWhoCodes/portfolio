import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <h1 className="text-xl font-medium">Page not found</h1>
      <p className="mt-2 text-muted-foreground">That page doesn't exist.</p>
      <Link to="/" className="link mt-8 inline-block">
        Back home
      </Link>
    </Layout>
  );
}
