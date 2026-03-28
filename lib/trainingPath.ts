/* ─────────────────────────────────────────────────────────────────────────────
   FSA ELITE — Structured Training Curriculum
   ───────────────────────────────────────────────────────────────────────────── */

export type LessonId = string;

export type Lesson = {
  id: LessonId;
  topicId: string;
  day: number;
  title: string;
  duration: string;
  concept: string;
  example: string;
  applyToday: string;
  drillPrompt: string;
};

export type Topic = {
  id: string;
  order: number;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
};

export const TRAINING_TOPICS: Topic[] = [
  {
    id: 'psychology',
    order: 1,
    title: 'Sales Psychology',
    icon: '🧠',
    description: 'Understand why buyers make decisions and how to earn trust before you ever pitch.',
    lessons: [
      {
        id: 'psych-1',
        topicId: 'psychology',
        day: 1,
        title: 'Why People Buy — The Real Reason',
        duration: '12 min',
        concept:
          'People make buying decisions based on emotion first, then justify with logic after the fact. The salesperson who speaks to feelings — security, status, excitement, fear of loss — will always outperform the one reciting specs. Your job is to find the emotional driver behind every objection and every question.',
        example:
          'A customer says they want "good gas mileage" on a new car, but the real driver is financial anxiety after a rough year. Speak to that fear directly and you close faster than any MPG comparison chart.',
        applyToday:
          'In your next conversation, ask one extra "why" question after the customer states a preference. Listen for the emotion underneath.',
        drillPrompt:
          'Practice with the AI by opening with discovery questions that dig past surface needs to find the emotional driver behind a purchase decision.',
      },
      {
        id: 'psych-2',
        topicId: 'psychology',
        day: 2,
        title: 'The Trust Window — First 60 Seconds',
        duration: '10 min',
        concept:
          'Buyers form their impression of you in the first 60 seconds — and most of that judgment is subconscious. Your energy, pace, eye contact, and word choice during that window set the entire tone of the interaction. A rushed or needy opener kills deals before they start.',
        example:
          'Walking onto the lot with a relaxed, curious opener like "Take your time, what brings you in today?" signals confidence. A pushy "Can I help you find something?" triggers the defensive "just looking" response.',
        applyToday:
          'Write out your first 3 sentences for a new customer interaction. Read them aloud. Make sure they project calm confidence — not urgency or desperation.',
        drillPrompt:
          'Ask the AI to play a skeptical customer walking onto the lot. Practice your first 60-second opener and get feedback on tone and delivery.',
      },
      {
        id: 'psych-3',
        topicId: 'psychology',
        day: 3,
        title: 'Reading Buyer Signals',
        duration: '11 min',
        concept:
          'Buyers constantly telegraph where they are in the decision process through their language, questions, and body language. Learning to recognize buying signals — and respond without over-pushing — is what separates the elite closer from the order-taker. When a customer leans in, asks about financing, or starts imagining ownership, that is your green light.',
        example:
          'When a customer says "So how long would delivery take?" or starts asking about warranty coverage, they have mentally moved past "if" and are thinking "when." Shift your response toward next steps, not more selling.',
        applyToday:
          'List 5 common buying signals you hear from customers. Write down the ideal response to each one that moves toward a close without pressure.',
        drillPrompt:
          'Have the AI roleplay a customer who starts dropping buying signals mid-conversation. Practice recognizing them and transitioning to the close naturally.',
      },
    ],
  },
  {
    id: 'body-language',
    order: 2,
    title: 'Body Language',
    icon: '💪',
    description: 'Project authority, build rapport, and read your customer — all without saying a word.',
    lessons: [
      {
        id: 'body-1',
        topicId: 'body-language',
        day: 4,
        title: 'Power Posture — Walk In Like You Own It',
        duration: '9 min',
        concept:
          'Your posture communicates status before you speak. Shoulders back, chin level, deliberate movement — these cues tell the customer they are dealing with someone worth listening to. Slouching, nervous fidgeting, or rushing into a conversation broadcasts low status and erodes trust instantly.',
        example:
          'The closer who walks across the showroom floor slowly, makes eye contact first, and extends a firm handshake controls the frame from the very start. The customer feels they are in good hands.',
        applyToday:
          'Before your next appointment or customer interaction, take 90 seconds to stand tall, breathe deep, and set your physical presence intentionally. Notice the difference.',
        drillPrompt:
          'Ask the AI to describe your posture and presence based on how you open the conversation. Work on making your opener feel physically grounded and confident.',
      },
      {
        id: 'body-2',
        topicId: 'body-language',
        day: 5,
        title: 'Mirroring — The Silent Persuader',
        duration: '10 min',
        concept:
          'Subtly matching your customer\'s energy, pace, and posture creates an unconscious sense of familiarity and rapport. People trust people who seem like them. Mirroring is not mimicking — it is calibrating your energy to meet the customer where they are, then gently leading.',
        example:
          'A reserved, quiet customer needs a slower, lower-energy version of you — not your full high-energy pitch. Match their pace, let silence work, and they will feel understood rather than pressured.',
        applyToday:
          'Practice mirroring in a casual conversation today — not in a sales context. Notice how people warm up when you subtly match their energy and speaking pace.',
        drillPrompt:
          'Have the AI play two different customer types — one loud and enthusiastic, one quiet and cautious. Practice adjusting your mirroring technique for each.',
      },
      {
        id: 'body-3',
        topicId: 'body-language',
        day: 6,
        title: 'Reading the Customer\'s Body',
        duration: '10 min',
        concept:
          'Crossed arms, leaning back, and avoiding eye contact signal resistance — often before the customer voices it. Open posture, forward lean, and direct eye contact signal engagement and buying intent. Reading these cues in real time lets you adjust your approach before you lose the room.',
        example:
          'A customer who starts crossing their arms during your price presentation is telegraphing discomfort. Pause, ask an open question, and re-engage before pushing forward with numbers.',
        applyToday:
          'In your next customer interaction, consciously track one physical cue — are they leaning in or leaning back? Let that guide whether you advance or slow down.',
        drillPrompt:
          'Ask the AI to describe the customer\'s body language mid-roleplay. Practice pausing and responding to negative signals before they become outright objections.',
      },
    ],
  },
  {
    id: 'objections',
    order: 3,
    title: 'Objection Handling',
    icon: '🛡️',
    description: 'Turn resistance into momentum. Handle every objection cleanly without arguing.',
    lessons: [
      {
        id: 'obj-1',
        topicId: 'objections',
        day: 7,
        title: 'The Objection Reframe — Never Argue Back',
        duration: '13 min',
        concept:
          'Arguing with an objection strengthens it. The elite closer\'s move is to acknowledge the concern fully, validate the emotion behind it, then gently reframe the perspective without contradiction. This keeps the customer feeling heard while you redirect the conversation forward.',
        example:
          '"I hear you — a lot of people feel that way before they see what\'s actually included. Can I show you the breakdown real quick?" — acknowledges, validates, and redirects in one move.',
        applyToday:
          'Write down your 3 most common objections. For each one, write an acknowledge-validate-redirect response that feels natural and never argumentative.',
        drillPrompt:
          'Have the AI throw your most common objection back-to-back. Practice the acknowledge-validate-redirect framework until it comes out without thinking.',
      },
      {
        id: 'obj-2',
        topicId: 'objections',
        day: 8,
        title: 'Price Objections — The Real Issue',
        duration: '12 min',
        concept:
          'When a customer says it\'s too expensive, they are almost never objecting to the number — they are signaling a value gap. They don\'t see enough value to justify the price yet. Your job is not to lower the price; it is to close the gap between what they see and what they\'re getting.',
        example:
          '"I understand the price feels high. Walk me back — what part of the package feels like it\'s not worth it to you?" Forces them to identify the gap, which you can then directly address.',
        applyToday:
          'List the top 3 value points of your product that customers consistently underestimate. Build a short value-stacking sequence you can deliver before price comes up.',
        drillPrompt:
          'Practice with the AI playing a customer who says "that\'s too much money." Work on value-stacking and reframing without discounting.',
      },
      {
        id: 'obj-3',
        topicId: 'objections',
        day: 9,
        title: 'The Think-It-Over Stall',
        duration: '11 min',
        concept:
          '"I need to think about it" almost always means something else: they have an unspoken concern, they don\'t see enough urgency, or they haven\'t been given permission to decide. The skilled closer doesn\'t accept this gracefully and walk away — they diagnose the real blocker behind the stall.',
        example:
          '"Absolutely, I want you to be comfortable. Can I ask — is there a specific part you\'re still weighing, or is it more of a timing thing?" Opens the real conversation instead of ending it.',
        applyToday:
          'Role-play the think-it-over response out loud three times today until you can deliver it without hesitation — curious, not desperate.',
        drillPrompt:
          'Have the AI deliver the "I need to think about it" objection and practice diagnosing what\'s actually behind it with targeted questions.',
      },
      {
        id: 'obj-4',
        topicId: 'objections',
        day: 10,
        title: 'Spouse/Partner Objections',
        duration: '11 min',
        concept:
          '"I have to ask my spouse/partner" can be a genuine concern or a polite exit — and the way you handle it determines which one it becomes. The goal is to get both decision-makers in the room, not to pressure the one who is there. Frame it as wanting to make sure everyone is fully informed.',
        example:
          '"That makes total sense — this is a big decision. Is there any way to get them on a quick call or bring them by? I want to make sure you both feel great about it."',
        applyToday:
          'Practice saying this response naturally. The tone should be supportive, not challenging. Record yourself once and listen back.',
        drillPrompt:
          'Have the AI play a customer who pulls the spouse objection. Practice handling it in a way that keeps the conversation alive without being dismissive.',
      },
    ],
  },
  {
    id: 'communication',
    order: 4,
    title: 'Communication',
    icon: '🗣️',
    description: 'Master tone, silence, and questioning — the three levers that control every conversation.',
    lessons: [
      {
        id: 'comm-1',
        topicId: 'communication',
        day: 11,
        title: 'Tone Over Words — How You Say It',
        duration: '10 min',
        concept:
          'Research consistently shows that how you say something carries more weight than what you say. Vocal tonality, pacing, and inflection communicate confidence, warmth, and authority independently of the words you choose. A weak tone on a strong close tanks the whole thing.',
        example:
          'Saying "This is the best option for you" in a flat, rising-inflection tone sounds like a question. The same sentence delivered with a slower, lower, declarative tone lands as conviction.',
        applyToday:
          'Record a 60-second pitch or closing statement. Listen back with the volume low — focus only on tone, not content. Identify one thing to fix.',
        drillPrompt:
          'Run a roleplay and ask the AI to score your tone separately from your content. Practice slowing down and speaking with more grounded conviction.',
      },
      {
        id: 'comm-2',
        topicId: 'communication',
        day: 12,
        title: 'The Power of Silence',
        duration: '9 min',
        concept:
          'Most salespeople are terrified of silence and rush to fill it — which is a critical mistake. Strategic silence after a question or after presenting a number forces the customer to process and respond. The first person to speak after a close attempt often loses the frame.',
        example:
          '"So based on everything we\'ve gone over, does Thursday or Friday work better for delivery?" Then stop talking. Let the silence do the work.',
        applyToday:
          'In your next customer conversation, after asking a closing question, count to five silently before speaking again. It will feel uncomfortable — that\'s the point.',
        drillPrompt:
          'Practice with the AI and intentionally hold silence after key questions. Get feedback on where you break too early and what better silence management looks like.',
      },
      {
        id: 'comm-3',
        topicId: 'communication',
        day: 13,
        title: 'Asking Better Questions',
        duration: '12 min',
        concept:
          'The quality of your questions determines the quality of the information you get — and therefore your ability to close. Weak questions get weak answers. Elite discovery questions are open-ended, emotionally relevant, and reveal the real needs and fears driving the buying decision.',
        example:
          '"What would it feel like to have a vehicle that never left you stranded?" is more powerful than "Do you want a reliable car?" One creates a picture; the other gets a yes/no.',
        applyToday:
          'Write 5 discovery questions for your product that are open-ended and emotionally loaded. Test them on your next customer interaction.',
        drillPrompt:
          'Have the AI play a customer with hidden needs. Practice asking layered discovery questions that peel back surface answers to uncover the real motivation.',
      },
    ],
  },
  {
    id: 'closing',
    order: 5,
    title: 'Closing',
    icon: '🤝',
    description: 'Earn the right to close, then do it — clean, confident, and without pressure.',
    lessons: [
      {
        id: 'close-1',
        topicId: 'closing',
        day: 14,
        title: 'Earn the Right to Close',
        duration: '11 min',
        concept:
          'Closing too early — before trust is built and value is established — creates resistance and kills deals. The close is a natural conclusion to a process, not a pressure tactic forced at the end. Earn the right to ask for the business by solving their problem completely first.',
        example:
          'If a customer is still asking basic questions about the product, you have not finished the consultation yet. Close after you have confirmed they understand the value — not before.',
        applyToday:
          'Identify the 3 signals that tell you a customer is ready to be closed. Write them down and practice recognizing them in your next interaction.',
        drillPrompt:
          'Ask the AI to play a customer who is not yet ready to close. Practice building value until the signals appear, then transition smoothly into the close.',
      },
      {
        id: 'close-2',
        topicId: 'closing',
        day: 15,
        title: 'The Assumptive Close',
        duration: '10 min',
        concept:
          'The assumptive close treats the decision as already made and moves directly to next-step logistics. It works because it reduces the friction of the decision moment and frames the purchase as the natural, expected outcome of the conversation. Used correctly, it feels smooth — not manipulative.',
        example:
          '"Alright, let me get the paperwork started — are you putting this on the card on file or would you like to use a different one?" assumes the deal is done and moves to action.',
        applyToday:
          'Write 3 assumptive close lines for your product that feel natural and move toward a next step. Practice delivering each one with calm certainty.',
        drillPrompt:
          'Roleplay a scenario where the customer seems ready. Practice deploying an assumptive close and handling any follow-up hesitation that comes from it.',
      },
      {
        id: 'close-3',
        topicId: 'closing',
        day: 16,
        title: 'The Soft Close — No Pressure Needed',
        duration: '10 min',
        concept:
          'The soft close is a permission-based approach that makes buying feel like the customer\'s own idea. Instead of asking for a decision, you guide them toward it by checking in on their comfort level and letting them confirm readiness. It removes the "sales pressure" feeling while still moving the deal forward.',
        example:
          '"Based on everything we\'ve talked about, how are you feeling — does this feel like the right fit for what you\'re looking for?" The customer closes themselves.',
        applyToday:
          'Add one soft-close check-in question to your current closing process. Use it before going full close to gauge temperature and remove hesitation.',
        drillPrompt:
          'Practice the soft close with the AI across different customer scenarios — ready buyers, hesitant buyers, and fence-sitters. Find your most natural phrasing.',
      },
    ],
  },
  {
    id: 'mindset',
    order: 6,
    title: 'Confidence & Mindset',
    icon: '🔥',
    description: 'Build the mental foundation that top closers operate from — every single day.',
    lessons: [
      {
        id: 'mind-1',
        topicId: 'mindset',
        day: 17,
        title: 'Slump Recovery — Getting Back on Track',
        duration: '10 min',
        concept:
          'Every top closer goes through slumps. The difference is how fast they recover. Slumps are almost always mental — not a market problem or a product problem. Diagnosing the specific habit or mindset that slipped, and correcting it with precision, is the skill that separates consistent earners from streaky ones.',
        example:
          'A slump after three lost deals in a row is often just a confidence leak affecting your tonality and close timing — not a fundamental skill problem. Drill your opening and your close for one day and watch the shift.',
        applyToday:
          'Write down what specifically changed the last time you hit a slump. Identify one correctable behavior — not a circumstance — and commit to fixing it today.',
        drillPrompt:
          'Run a high-pressure AI roleplay session right after a tough stretch. Use it to rebuild your rhythm and reset your confidence before real customer interactions.',
      },
      {
        id: 'mind-2',
        topicId: 'mindset',
        day: 18,
        title: 'The Pre-Game Ritual',
        duration: '9 min',
        concept:
          'Elite performers in every field — sports, business, performance — use pre-game rituals to enter peak state intentionally. For closers, this means arriving physically and mentally prepared rather than coasting into conversations cold. Your ritual does not need to be complex; it needs to be consistent.',
        example:
          'A 5-minute pre-shift routine — review your top 3 closes, take 10 deep breaths, recall your best deal ever in vivid detail — primes your nervous system for peak performance.',
        applyToday:
          'Design a 5-minute pre-shift ritual you can do before every work session. Write it down, commit to it for one week, and notice the impact on your first 30 minutes.',
        drillPrompt:
          'Use an AI practice session as part of your pre-game ritual. Run one clean drill before hitting the floor to get your instincts sharp and your confidence dialed in.',
      },
      {
        id: 'mind-3',
        topicId: 'mindset',
        day: 19,
        title: 'Identity — Selling From Strength',
        duration: '12 min',
        concept:
          'Your performance ceiling is set by your identity — the story you tell yourself about who you are as a salesperson. Closers who see themselves as elite professionals operate differently than those who see themselves as "just doing a job." Selling from a place of strength, certainty, and pride in your craft elevates every interaction.',
        example:
          'The rep who says "I help people make decisions they\'ll be proud of" operates differently in every conversation than the one who says "I just try to hit my numbers." Identity is destiny in sales.',
        applyToday:
          'Write a 2-sentence identity statement about yourself as a sales professional — who you are, what you stand for, and what customers get from working with you. Read it every morning.',
        drillPrompt:
          'Do a full roleplay session in the AI Arena operating from your new identity statement. Notice how it shifts your tone, confidence, and willingness to hold frame under pressure.',
      },
    ],
  },
];

/**
 * Returns a "today's lesson" by cycling through all lessons based on the
 * day of the year, so every day surfaces a different lesson.
 */
export function getTodayLesson(): Lesson | null {
  const all = getAllLessons();
  if (all.length === 0) return null;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return all[dayOfYear % all.length] ?? null;
}

/** Returns all lessons for a specific topic. */
export function getLessonsByTopic(topicId: string): Lesson[] {
  const topic = TRAINING_TOPICS.find((t) => t.id === topicId);
  return topic ? topic.lessons : [];
}

/** Returns every lesson across all topics in order. */
export function getAllLessons(): Lesson[] {
  return TRAINING_TOPICS.flatMap((t) => t.lessons);
}
