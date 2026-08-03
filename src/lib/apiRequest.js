import toast from "react-hot-toast";

export async function makePostRequest({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  router,
  redirectPath,
}) {
  try {
    const res = await fetch(endpoint, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (res.ok) {
      reset();
      toast.success(`Tạo ${resourceName} thành công`);
      if (router && redirectPath) {
        router.push(redirectPath);
      }
    } else {
      const error = await res.json();
      toast.error(error.error || "Có lỗi xảy ra");
    }
  } catch (_error) {
    toast.error("Có lỗi xảy ra");
  } finally {
    setLoading(false);
  }
}
