const sharePG = async ({ pg }) => {
  const shareData = {
    title: `Check out ${pg?.branch?.name || "this PG"}`,
    text: "Have a look at this PG!",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      toast.success("Shared successfully!");
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("Sharing failed or cancelled");
    }
  } else {
    // fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.info("Sharing not supported");
    }
  }
};

export default sharePG;