import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import getAuthHeader from "./headers/auth-header";
import type { ProductPrivateInfo } from "./_types";

export default function usePrivateProductInfo(id: number) {
  const [product, setProduct] = useState<ProductPrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProduct(id: number) {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      setLoading(true);
      const res = await fetch(ApiRoutes.privateProductInfo(id), { headers: authHeader });
      if (!res.ok) return console.error(await res.text());
      setProduct(await res.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  function refresh() {
    fetchProduct(id);
  }

  return { product, setProduct, loading, refresh };
}
