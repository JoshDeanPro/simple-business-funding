export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  intro: string;
  image: string;
  alt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-small-business-funding",
    title: "Understanding small business funding options",
    category: "Funding basics",
    date: "June 12, 2026",
    readTime: "6 min read",
    intro:
      "The right funding is less about chasing the biggest number and more about choosing a structure your business can comfortably support.",
    image: "/images/blog-business-basics.png",
    alt: "Boutique owner opening her storefront",
    sections: [
      {
        heading: "Start with the job the money needs to do",
        paragraphs: [
          "Before comparing products, name the specific business problem you are solving. Inventory, equipment, a seasonal cash-flow gap, and an expansion project each have different timing and repayment needs.",
          "A clear use of funds also helps you decide how quickly you need an answer and what documentation will make the review easier.",
        ],
      },
      {
        heading: "Look beyond the headline amount",
        paragraphs: [
          "The amount offered is only one part of the decision. Pay attention to the total payback, payment frequency, estimated term, fees, and how the payment fits alongside payroll, rent, and taxes.",
          "A funding option should leave the business room to operate through a normal slower month. If the payment only works in a perfect month, it is probably too aggressive.",
        ],
      },
      {
        heading: "Prepare a simple picture of the business",
        paragraphs: [
          "Recent bank statements, a short explanation of the funding need, and accurate ownership information give a reviewer useful context. Strong applications are clear, consistent, and easy to follow.",
        ],
      },
    ],
  },
  {
    slug: "how-bank-statements-are-reviewed",
    title: "How lenders review business bank statements",
    category: "Applications",
    date: "May 28, 2026",
    readTime: "5 min read",
    intro:
      "Bank statements show the operating rhythm of a business. Here is what a review usually tries to understand from them.",
    image: "/images/blog-cash-flow.png",
    alt: "Restaurant owner reviewing cash-flow notes",
    sections: [
      {
        heading: "Consistency matters",
        paragraphs: [
          "Reviewers look at deposits over time, not just the strongest month. Regular revenue gives a clearer picture of how the business handles an additional payment.",
          "Seasonality is not automatically a problem. It helps to explain when the busy and slower periods happen so the numbers are read in context.",
        ],
      },
      {
        heading: "The statement tells a story",
        paragraphs: [
          "Deposits, balances, returned items, transfers, and existing obligations can each add context. A short explanation for an unusual deposit or one-time expense can prevent unnecessary confusion.",
          "Keep the original statements together and make sure every page is legible. Cropped pages or screenshots without account context can slow down a review.",
        ],
      },
      {
        heading: "What to have ready",
        paragraphs: [
          "Have six months of complete business statements available, along with basic ownership and contact information. If the business has existing funding, keep the original agreement and current balance nearby.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-a-funding-review",
    title: "Preparing your business for a funding review",
    category: "Preparation",
    date: "May 9, 2026",
    readTime: "4 min read",
    intro:
      "A few small preparation steps can make an application easier to complete and help a representative understand your business faster.",
    image: "/images/blog-business-growth.png",
    alt: "Contractor reviewing plans on a tablet",
    sections: [
      {
        heading: "Gather the basics first",
        paragraphs: [
          "Have your legal business name, operating address, tax ID, start date, ownership details, and primary contact information in one place. Using the same spelling and formatting throughout the application avoids delays.",
        ],
      },
      {
        heading: "Be specific about the request",
        paragraphs: [
          "A clear answer to ‘how will the funds help?’ is more useful than a generic growth statement. Explain whether the money supports inventory, equipment, payroll, marketing, a new location, or working capital.",
          "If timing matters, include that too. It helps the review stay focused on the decision your business actually needs to make.",
        ],
      },
      {
        heading: "Review before you submit",
        paragraphs: [
          "Take a final pass for missing fields, unreadable uploads, and incorrect contact information. A complete application gives the representative a better starting point for the conversation.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
