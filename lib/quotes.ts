export type InspirationalQuote = {
  content: string;
  author: string;
};

// Local repository of inspirational quotes used when the external API fails.
// You can extend this list freely; the app will automatically pick a random entry.
export const fallbackQuotes: InspirationalQuote[] = [
  {
    content: 'The future depends on what you do today.',
    author: 'Mahatma Gandhi',
  },
  {
    content: 'Success is the sum of small efforts, repeated day in and day out.',
    author: 'Robert Collier',
  },
  {
    content: 'It always seems impossible until it is done.',
    author: 'Nelson Mandela',
  },
  {
    content: 'Do not wait to strike till the iron is hot; but make it hot by striking.',
    author: 'William Butler Yeats',
  },
  {
    content: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    content: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
  },
  {
    content: 'What you get by achieving your goals is not as important as what you become by achieving your goals.',
    author: 'Zig Ziglar',
  },
  {
    content: 'The best way to predict the future is to create it.',
    author: 'Peter Drucker',
  },
  {
    content: 'Your time is limited, so don’t waste it living someone else’s life.',
    author: 'Steve Jobs',
  },
  {
    content: 'You miss 100% of the shots you don’t take.',
    author: 'Wayne Gretzky',
  },
  {
    content: 'Whether you think you can or you think you can’t, you’re right.',
    author: 'Henry Ford',
  },
  {
    content: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
  },
  {
    content: 'Dream big and dare to fail.',
    author: 'Norman Vaughan',
  },
  {
    content: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
  },
  {
    content: 'Opportunities don’t happen, you create them.',
    author: 'Chris Grosser',
  },
  {
    content: 'Everything you’ve ever wanted is on the other side of fear.',
    author: 'George Addair',
  },
  {
    content: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
    author: 'Ralph Waldo Emerson',
  },
  {
    content: 'Don’t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
  },
  {
    content: 'If you can dream it, you can do it.',
    author: 'Walt Disney',
  },
  {
    content: 'Keep your face always toward the sunshine—and shadows will fall behind you.',
    author: 'Walt Whitman',
  },
  {
    content: 'Limit your “always” and your “nevers.”',
    author: 'Amy Poehler',
  },
  {
    content: 'Failure is simply the opportunity to begin again, this time more intelligently.',
    author: 'Henry Ford',
  },
  {
    content: 'Hardships often prepare ordinary people for an extraordinary destiny.',
    author: 'C.S. Lewis',
  },
  {
    content: 'If you’re going through hell, keep going.',
    author: 'Winston Churchill',
  },
  {
    content: 'The only limit to our realization of tomorrow is our doubts of today.',
    author: 'Franklin D. Roosevelt',
  },
  {
    content: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
  },
  {
    content: 'You are never too old to set another goal or to dream a new dream.',
    author: 'C.S. Lewis',
  },
  {
    content: 'In the middle of every difficulty lies opportunity.',
    author: 'Albert Einstein',
  },
  {
    content: 'The man who moves a mountain begins by carrying away small stones.',
    author: 'Confucius',
  },
  {
    content: 'Courage is not the absence of fear, but rather the judgment that something else is more important than fear.',
    author: 'Ambrose Redmoon',
  },
  {
    content: 'Perseverance is not a long race; it is many short races one after the other.',
    author: 'Walter Elliot',
  },
  {
    content: 'You don’t have to be great to start, but you have to start to be great.',
    author: 'Zig Ziglar',
  },
  {
    content: 'Start where you are. Use what you have. Do what you can.',
    author: 'Arthur Ashe',
  },
  {
    content: 'The harder the conflict, the greater the triumph.',
    author: 'George Washington',
  },
  {
    content: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    content: 'Small deeds done are better than great deeds planned.',
    author: 'Peter Marshall',
  },
  {
    content: 'Action is the foundational key to all success.',
    author: 'Pablo Picasso',
  },
  {
    content: 'What we fear of doing most is usually what we most need to do.',
    author: 'Ralph Waldo Emerson',
  },
  {
    content: 'Great things are done by a series of small things brought together.',
    author: 'Vincent van Gogh',
  },
  {
    content: 'The journey of a thousand miles begins with one step.',
    author: 'Lao Tzu',
  },
  {
    content: 'Discipline is the bridge between goals and accomplishment.',
    author: 'Jim Rohn',
  },
  {
    content: 'Our greatest glory is not in never falling, but in rising every time we fall.',
    author: 'Confucius',
  },
  {
    content: 'You must do the thing you think you cannot do.',
    author: 'Eleanor Roosevelt',
  },
  {
    content: 'If you want something you’ve never had, you must be willing to do something you’ve never done.',
    author: 'Thomas Jefferson',
  },
  {
    content: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Will Durant',
  },
  {
    content: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
  },
  {
    content: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
  },
  {
    content: 'If opportunity doesn’t knock, build a door.',
    author: 'Milton Berle',
  },
  {
    content: 'Great things never came from comfort zones.',
    author: 'Unknown',
  },
  {
    content: 'Doubt kills more dreams than failure ever will.',
    author: 'Suzy Kassem',
  },
  {
    content: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
  },
  {
    content: 'The only person you are destined to become is the person you decide to be.',
    author: 'Ralph Waldo Emerson',
  },
  {
    content: 'Do one thing every day that scares you.',
    author: 'Eleanor Roosevelt',
  },
  {
    content: 'The future starts today, not tomorrow.',
    author: 'Pope John Paul II',
  },
  {
    content: 'Success is walking from failure to failure with no loss of enthusiasm.',
    author: 'Winston Churchill',
  },
  {
    content: 'Motivation is what gets you started. Habit is what keeps you going.',
    author: 'Jim Rohn',
  },
];


