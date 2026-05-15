export const TEACHER_QUOTES = [
  {
    text: "Teaching is the greatest act of optimism.",
    author: "Colleen Wilcox",
  },
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "William Butler Yeats",
  },
  {
    text: "The influence of a good teacher can never be erased.",
    author: "Unknown",
  },
  {
    text: "To teach is to learn twice.",
    author: "Joseph Joubert",
  },
  {
    text: "Students don't care how much you know until they know how much you care.",
    author: "John C. Maxwell",
  },
  {
    text: "The best teachers teach from the heart, not from the book.",
    author: "Unknown",
  },
  {
    text: "Every child deserves a champion: an adult who will never give up on them.",
    author: "Rita Pierson",
  },
  {
    text: "What the teacher is, is more important than what he teaches.",
    author: "Karl Menninger",
  },
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X",
  },
  {
    text: "A good education can change anyone. A good teacher can change everything.",
    author: "Unknown",
  },
  {
    text: "The art of teaching is the art of assisting discovery.",
    author: "Mark Van Doren",
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  },
  {
    text: "Great teachers empathize with their students, motivate them, and inspire them.",
    author: "Unknown",
  },
  {
    text: "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.",
    author: "William Arthur Ward",
  },
  {
    text: "Children must be taught how to think, not what to think.",
    author: "Margaret Mead",
  },
  {
    text: "One child, one teacher, one book, one pen can change the world.",
    author: "Malala Yousafzai",
  },
  {
    text: "The task of the modern educator is not to cut down jungles, but to irrigate deserts.",
    author: "C.S. Lewis",
  },
  {
    text: "Teachers have three loves: love of learning, love of learners, and the love of bringing the first two loves together.",
    author: "Scott Hayden",
  },
  {
    text: "Your work is not to drag the world kicking and screaming into a new awareness. Your job is to simply do your work.",
    author: "Unknown",
  },
  {
    text: "Marking is care made visible. Every comment is a conversation with a student's future self.",
    author: "Evalio",
  },
] as const;

export function getRandomQuote() {
  const index = Math.floor(Math.random() * TEACHER_QUOTES.length);
  return TEACHER_QUOTES[index];
}
