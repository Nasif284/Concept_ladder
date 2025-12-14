import { generateLadderContent } from "./ai";

export const generateTopicContent = async (topicName) => {
  const id = crypto.randomUUID();
  const slug = topicName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Try to get real AI content
  const aiContent = await generateLadderContent(topicName);
  
  const baseTopic = {
    id,
    slug,
    title: topicName,
    lastAccessed: new Date().toISOString(),
    progress: "kid", // Current highest unlocked level
    isFavorite: false,
    levels: {
      kid: {
        id: "kid",
        title: "Kid Level",
        subtitle: "A fun, simple explanation.",
        description: `Imagine ${topicName} is like a giant playground. In this level, we'll explore the basic ideas using fun analogies that make it super easy to understand!`,
        content: `Here is where the fun explanation for ${topicName} would go. It uses simple words and connects the concept to things you already know, like toys or games.`,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQqMexNDdIQNzOI9t1xSwDNFU6MxoAh65vi0eqaN1Z9jvUHbRmMRNlFn1MAmjGz8kqOlp7H3WOqDS5b5xXn8Kwp4YsBLR-B4soMxvpT_r8369MZPp8gLMblkdNzDdaAxFEwD4W4U_SMtb1iTvjKV8VWD7lSpGECGWdrtPRA56aGnih6IULcsGVVDwOeaBammCMVM1CUaQBgDvijJDp0VOdcjj_z8FUNtEGaZ1c5cvfZ1tUrTNiYLsjbRKoyQUum7MdV05x_Aev1mLr",
        unlocked: true,
        completed: false,
      },
      beginner: {
        id: "beginner",
        title: "Beginner Level",
        subtitle: "A basic, structured explanation.",
        description: `Now that you have the basic idea, let's look at ${topicName} with a bit more detail. We'll learn the key terms and how things actually work together.`,
        content: `This section dives deeper into ${topicName}. We introduce standard terminology and explain the core mechanisms in a structured way, perfect for building a solid foundation.`,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh7xpL2cEUUeCaHKKfDbn8-OwC69qTUnppPrzKYGAiq5PO_PFm5wCNXypkKD36Dv51To2eWD37Tn3Abq6rSIYzhAjfNtuPEGJAcWXyqJ8YISNoPMLK0W-Yt67SXWNn6mYDhQw285_mw7iH3TcWXQWKjWpQZQ2WZvsEHxXWg1mEyb09ruJY6eXe8u_GP2RoK3Jw3CNEwByrpyyIWidXiI3iPIHnP3dTUau0pe8J6ODbqD_8x_1ens-vssZtXzuVEzfkn500CvwuxJK_",
        unlocked: false,
        completed: false,
      },
      advanced: {
        id: "advanced",
        title: "Advanced Level",
        subtitle: "A deep, expert-level explanation.",
        description: `Ready for the real deal? This level explores the complex nuances, mathematical models, and cutting-edge applications of ${topicName}.`,
        content: `This is the expert level analysis of ${topicName}. We cover advanced theories, edge cases, and the latest research developments in the field.`,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgqKFk1_wsTS4ceftKegKpnci8cv7x0naVHbGQaW6yCaVdvKVudAibrorQHUNMeUp2qTTse7DhdjEdNUHan9g430c9ubPq_mfHivZZuv_4qm-Kpdc8QQ_VRPpk6rXaHxGtCUtRhHAigIQITGR52nibSIVKxOMAM040t9WdwK5HETbRGHUaiKIP52_AoPNd5kZSCeiZIUZM9HLaCPulp2diio573zvLwdIqvFGFDDoJSvrFwDDXzcTWKYeRnahbQ-R9-P3v08zkuV78",
        unlocked: false,
        completed: false,
      }
    }
  };

  if (aiContent) {
    // Merge AI content
    if (aiContent.kid) Object.assign(baseTopic.levels.kid, aiContent.kid);
    if (aiContent.beginner) Object.assign(baseTopic.levels.beginner, aiContent.beginner);
    if (aiContent.advanced) Object.assign(baseTopic.levels.advanced, aiContent.advanced);
  }

  return baseTopic;
};
