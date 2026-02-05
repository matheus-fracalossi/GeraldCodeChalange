const CATEGORY_EMOJI_MAP: Record<string, string> = {
  "Food & Drink": "🍽️",
  Income: "💰",
  Salary: "💼",
  Entertainment: "🎬",
  Transportation: "🚗",
  Transport: "🚗",
  Groceries: "🛒",
  "Health & Fitness": "💊",
  Investment: "📈",
  Shopping: "🛍️",
  Rewards: "🎁",
  Utilities: "💡",
  Government: "🏛️",
  "Home & Garden": "🏠",
};

export const getCategoryEmoji = (category: string): string => {
  return CATEGORY_EMOJI_MAP[category] || "📋";
};
