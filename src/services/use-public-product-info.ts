import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { ProductPublicInfo } from "./_types";

export default function usePublicProductInfo(id: number) {
  const [product, setProduct] = useState<ProductPublicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProduct(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.publicProductInfo(id));
      if (!result.ok) return console.error(await result.text());
      setProduct(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return { product, loading };
}
