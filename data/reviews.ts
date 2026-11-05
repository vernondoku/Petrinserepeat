import type { Service } from "./site";

export type Review = { name: string; text: string; when?: string };

/**
 * Real public Google reviews, copied from each business's own Google listing on Nov 5, 2026.
 * Names are as shown publicly on Google. Do not edit wording or invent entries.
 */
export const reviewsByService: Record<Service, Review[]> = {
  mobile: [
    { name: "Laura S", when: "3 months ago", text: "They do such a wonderful job with my golden. He goes a bit shorter in the summer and they do the best job I’ve ever had. It’s so convenient to do it at my house too!" },
    { name: "Lillian Terrell", when: "3 months ago", text: "They did such a good job with my dog she loved it when she’s normally so anxious to be groomed." },
    { name: "Kat K", when: "4 months ago", text: "Maggie looks amazing!!! Thank you for taking such good care of her. That thick long shepherd coat is gone for the summer!" },
    { name: "Jody", when: "4 months ago", text: "First time using Pet Rinse Repeat and it has been top notch experience. The convenience to be able to work with my schedule was great. The groomer did an excellent job with my Pup Gypsy and was very loving to my fur baby." },
  ],
  salon: [
    { name: "Kitty King", when: "a week ago", text: "Lacy always does a great job with our dog Ellie. Ellie is a very nervous dog and Lacy puts her at ease. We will only take her here because we know that Lacy will take her time with her." },
    { name: "Scott Harrison", when: "2 weeks ago", text: "Wow, just wow! Can I give them six stars? I took my very nervous pup in and they totally took control, pampered my pup and sent her home looking great and clearly very happy." },
    { name: "SW", when: "2 weeks ago", text: "Dani and Lacey are OUTSTANDING. They are patience and kind. They take the extra time to calm my anxious senior dog, even giving her a massage to calm her." },
    { name: "Pamela Miller", when: "recent", text: "Lacey was extra gentle around his face, snout and mouth. He had a good time, relaxed and knowing how she loved him. That's the difference. Lacey always notices the slightest changes in our boy, and we and our vet are most appreciative." },
  ],
  cat: [
    { name: "Alexis Murphy", when: "2 months ago", text: "Amy was amazing! Very sweet and professional kept me updated before arriving and during my cat’s grooming. Did everything I asked for and didn’t trim too much of my cat’s fur." },
    { name: "Tatum Smith", when: "5 months ago", text: "My groomer is so great and communicative every time! I have a shy kitty and I never worry about her when she’s in their care. Could not recommend enough!" },
    { name: "Jennifer Martin", when: "6 months ago", text: "Our kitties go every 6 weeks and it’s the best! Right to our driveway and back means less time and less kitty drama. My boy kitty enjoys it!" },
    { name: "Jacquelyn Kelley", when: "a month ago", text: "My cat Oliver looks like a brand new cat! Thank you!" },
  ],
};

/** Homepage mix: one or two from each listing. */
export const reviews: (Review & { service: Service })[] = [
  { ...reviewsByService.salon[1], service: "salon" },
  { ...reviewsByService.mobile[0], service: "mobile" },
  { ...reviewsByService.cat[1], service: "cat" },
  { ...reviewsByService.salon[2], service: "salon" },
];
