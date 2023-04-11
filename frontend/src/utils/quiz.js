export const QuizQue = {
  1: {
    level: 1,
    question: "I'M LOOKING FOR HELP FOR…",
    answer: [
      { id: 1, text: "A CLIENT OR PATIENT", subQue: false },
      { id: 2, text: "A FRIEND OR FAMILY MEMBER", subQue: false },
      { id: 3, text: "MYSELF", subQue: false },
    ],
  },
  2: {
    level: 2,
    question: "WHAT IS HER BASIC SITUATION?",
    answer: [
      {
        id: 4,
        text: "I AM PREGNANT OR MIGHT BE PREGNANT.",
        subQue: true,
        subid: 1,
      },
      {
        id: 5,
        text: "I AM CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2.",
        subQue: true,
        subid: 12,
      },
      {
        id: 6,
        text: "I HAVE EXPERIENCED PREGNANCY LOSS OR THE LOSS OF MY YOUNG CHILD.",
        subQue: true,
        subid: 15,
      },
      {
        id: 7,
        text: "I AM CONSIDERING BECOMING AN ADOPTION OR FOSTER CARE PARENT.",
        subQue: true,
        subid: 19,
      },
    ],
  },
  3: {
    level: 3,
    question:
      "These questions are organized in an intentional order to help address the area(s) of greatest need first.  To order the search priorities, we recommend starting at the top and working your way down. You could choose to address the areas marked “Not Secure”, from top to bottom, first. Then you can move to address the “Somewhat Secure” answers, again top to bottom.  RANK HER CONFIDENCE IN THE FOLLOWING STATEMENTS:",
    answer: [
      {
        id: 8,
        question: "I FEEL CONFIDENT THAT I CAN FEED MYSELF AND MY FAMILY.",
        answer: [
          {
            id: 9,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "MATERIAL OR LEGAL SUPPORT",
            ssubcat: "Food and Nutrition",
          },
          { id: 10, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 11,
        question:
          "I FEEL CONFIDENT THAT MY HOUSING IS SAFE, AFFORDABLE, AND STABLE.",
        answer: [
          {
            id: 12,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "MATERIAL OR LEGAL SUPPORT",
            ssubcat: "Housing, Shelters, and Maternity Homes",
          },
          { id: 13, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 14,
        question:
          "I HAVE CONFIDENCE THAT I CAN GET AROUND EASILY AND GO TO GET SERVICES.",
        answer: [
          {
            id: 15,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "MATERIAL OR LEGAL SUPPORT",
            ssubcat: "Transportation",
          },
          { id: 16, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 17,
        question:
          "I FEEL CONFIDENT THAT I HAVE ENOUGH KNOWLEDGE AND SUPPORT TO PARENT WELL.",
        answer: [
          {
            id: 18,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "CARE FOR CHILDREN",
            ssubcat: "Family and Parenting Education",
          },
          { id: 19, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 20,
        question: "I FEEL CONFIDENT THAT I HAVE SAFE AND AFFORDABLE CHILDCARE.",
        answer: [
          {
            id: 21,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "CARE FOR CHILDREN",
            ssubcat: "Childcare Help",
          },
          { id: 22, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 23,
        question:
          "I FEEL CONFIDENT THAT I HAVE ENOUGH FURNITURE, CLOTHES, AND BABY SUPPLIES TO CARE FOR MY CHILD(REN) WELL.",
        answer: [
          {
            id: 24,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "MATERIAL OR LEGAL SUPPORT",
            ssubcat: "Clothing, Household Goods, and Baby Supplies",
          },
          { id: 25, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 26,
        question: "I HAVE CONFIDENCE THAT MY FAMILY HAS ENOUGH MONEY TO LIVE.",
        answer: [
          {
            id: 27,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "FINANCIAL ASSISTANCE, WORK, OR EDUCATION",
            ssubcat: "all",
          },
          { id: 28, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 29,
        question:
          "I HAVE CONFIDENCE MY FAMILY CAN FIND AND AFFORD MEDICAL SERVICES – INCLUDING PRENATAL, DENTAL, AND GENERAL CARE AS APPLICABLE.",
        answer: [
          {
            id: 30,
            text: "Not Sure/Somewhat Secure",
            subQue: false,
            scat: "Health and well-being",
            ssubcat: "all",
          },
          { id: 31, text: "Secure", subQue: false },
        ],
        subQue: false,
      },
    ],
  },
  4: {
    level: 4,
    question: "SPECIAL QUESTIONS - YES OR NO",
    answer: [
      {
        id: 32,
        question: "I AM CURRENTLY EXPERIENCING SUICIDAL THOUGHTS.",
        answer: [
          {
            id: 33,
            text: "yes",
            subQue: false,
            hotline: true,
            hotlineA: [
              {
                number: "1-800-273-8255",
                title: "National Suicide Prevention Hotline",
                link: "https://suicidepreventionlifeline.org/",
              },
              {
                number: "1-877-726-472",
                title:
                  "Substance Abuse and Mental Health Services Administration",
                link: "https://www.samhsa.gov/",
              },
            ],
          },
          { id: 34, text: "no", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 35,
        question:
          "I AM CURRENTLY STRUGGLING WITH SUBSTANCE ABUSE OR ADDICTION.",
        answer: [
          {
            id: 36,
            text: "yes",
            subQue: false,
            hotline: true,
            hotlineA: [
              {
                number: "800-721-5998",
                title: "Alcohol or Drug Abuse Counselor",
                link: "https://www.womensoberhousing.com/info/about.html",
              },
              {
                number: "1-844-289-087",
                title: "National Drug Helpline",
                link: "http://drughelpline.org/",
              },
              {
                number: "1-877-726-472",
                title:
                  "Substance Abuse and Mental Health Services Administration",
                link: "https://www.samhsa.gov/",
              },
            ],
          },
          { id: 37, text: "no", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 38,
        question:
          "I AM STRUGGLING WITH GRIEF, TRAUMA, RELATIONSHIP ISSUES, DEPRESSION, ANXIETY, OR OTHER EMOTIONAL PROBLEMS.",
        answer: [
          {
            id: 39,
            text: "yes",
            subQue: false,
            scat: "RECOVERY AND MENTAL HEALTH",
            ssubcat: "Counseling for Women And Families",
          },
          { id: 40, text: "no", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 41,
        question: "I AM STRUGGLING TO ADJUST AFTER THE BIRTH OF A CHILD",
        answer: [
          {
            id: 42,
            text: "yes",
            subQue: false,
            scat: "HER HEALTH AND WELL-BEING",
            ssubcat: "Women's Health Services",
          },
          { id: 43, text: "no", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 44,
        question: "I HAVE BEEN RAPED, ASSAULTED, TRAFFICKED, OR ABUSED.",
        answer: [
          {
            id: 45,
            text: "yes",
            subQue: false,
            hotline: true,
            scat: "RECOVERY AND MENTAL HEALTH",
            ssubcat:
              "Intimate Partner Violence, Rape, Assault, or Sex Trafficking",
            hotlineA: [
              {
                number: "(800) 656-HOPE",
                title:
                  "Rape, Sexual Assault, Abuse, and Incest National Network (RAINN)",
                link: "https://www.rainn.org/",
              },
              {
                number: "1-888-373-7888 (text 233733)",
                title: "National Human Trafficking Hotline",
                link: "https://humantraffickinghotline.org/",
              },
              {
                number: "1-800-656-HOPE (4673)",
                title: "National Sexual Assault Hotline",
                link: "https://www.rainn.org/",
              },
              {
                number: "1-800-799-7233",
                title: "National Domestic Violence Hotline",
                link: "https://www.thehotline.org/",
              },
            ],
          },
          { id: 46, text: "no", subQue: false },
        ],
        subQue: false,
      },
      {
        id: 47,
        question: "I NEED HELP WITH A LEGAL SITUATION.",
        answer: [
          {
            id: 48,
            text: "yes",
            subQue: false,
            scat: "MATERIAL OR LEGAL SUPPORT",
            ssubcat: "Legal Support",
          },
          { id: 49, text: "no", subQue: false },
        ],
        subQue: false,
      },
    ],
  },
};

export const subQue = {
  1: {
    id: 1,
    question: "HAVE YOU CONFIRMED YOUR PREGNANCY VIA ULTRASOUND OR BLOOD TEST?",
    answer: [
      { id: 2, text: "no", ssubcat: "all", scat: "MENTORSHIP", subQue: false },
      { id: 3, text: "yes", subQue: true, subid: 4 },
    ],
  },
  4: {
    id: 4,
    question: "HOW DO YOU FEEL ABOUT YOUR PREGNANCY?",
    answer: [
      {
        id: 5,
        text: "I AM NOT SURE ABOUT CONTINUING THIS PREGNANCY",
        ssubcat: "all",
        subQue: false,
        scat: "MENTORSHIP",
      },
      { id: 6, text: "I AM CONSIDERING ABORTION", subQue: true, subid: 9 },
      {
        id: 7,
        text: "I TOOK THE FIRST ABORTION PILL, BUT NOW I AM HAVING REGRETS.",
        subQue: "false",
        hotline: true,
        hotlineA: [
          {
            number: "877-558-0333 (24/7)",
            title: "Abortion Pill Reversal",
            link: "https://www.abortionpillreversal.com/",
          },
        ],
        subQue: false,
      },
      {
        id: 8,
        text: "I AM PLANNING TO CARRY MY PREGNANCY TO TERM BUT I’M NOT SURE I CAN TAKE CARE OF MY CHILD.",
        genText:
          "Sometimes parents who feel they can’t care for their children make a plan for open adoption so they can still be in their child’s life while giving them the best chances of success. Go to CARE FOR CHILDREN and search in Adoption Services for high-quality programs in your area to learn more for free.",
        scat: "CARE FOR CHILDREN",
        ssubcat: "all",
      },
    ],
  },
  9: {
    id: 9,
    question: "I AM CONSIDERING ABORTION.",
    answer: [
      {
        id: 10,
        text: " I FEEL THIS MIGHT BE THE BEST DECISION FOR ME.",
        genText:
          "We understand pregnancy decisions are complicated. Many woman find they benefit from discussing their options with a pregnancy help organizations. Go to MENTORSHIP and search in Pregnancy Help or Case Management or continue the quiz.",
        ssubcat: "all",
        scat: "MENTORSHIP",
        subQue: false,
      },
      {
        id: 11,
        text: "I HAVE BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION.",
        genText: `Doctors sometimes recommend abortion if there is something wrong with the mom or baby, but abortion is often not actually necessary in these cases, the doctor may just not be trained to handle your case. You have the option to continue your pregnancy.
        If your doctor is recommending abortion because he thinks your life is at risk, you can get a second opinion by searching in Women's Health Medical Services underHEALTH AND WELL-BEING.The danger may not be immediate; you may be able to keep going with the pregnancy with careful monitoring to see if your condition improves, or to see if your body miscarries naturally. If you are in immediate danger, early induction is a safe alternative to dismemberment abortion that allows you to say goodbye to your baby.
        If your doctor is recommending abortion because of the condition of the unborn baby, search PRENATAL OR PERINATAL DIAGNOSIS to find resources to care for a baby with disabilities or medical conditions, or resources to say goodbye without abortion through a Perinatal Hospice Program. You can also search Adoption Services under CARE FOR CHILDREN if you think you might be unable to care for your child but want to make a plan for their care. Another family may be wanting and even requesting a special needs child.`,
        subQue: false,
        ssubcat: "all",
        scat: "HEALTH AND WELL-BEING",
      },
    ],
  },
  12: {
    id: 12,
    question: "I AM CONSIDERING ABORTION.",
    answer: [
      {
        id: 13,
        text: "YES",
        subQue: false,
        ssubcat: "all",
        scat: "PRENATAL OR PERINATAL DIAGNOSIS",
      },
      {
        id: 14,
        text: "NO",
        subQue: false,
      },
    ],
  },
  15: {
    id: 15,
    question: "I HAVE EXPERIENCED PREGNANCY LOSS OR THE LOSS OF MY YOUNG CHILD",
    answer: [
      {
        id: 16,
        text: "I HAVE HAD AN ABORTION.",
        subQue: false,
        ssubcat: "Abortion Recovery and Healing for help after abortion",
        scat: "RECOVERY AND MENTAL HEALTH",
        hotline: true,
        hotlineA: [
          {
            number: "1-866-482-LIFE (5433)",
            title:
              "Concepts of Truth International Helpline for Abortion Recovery",
            link: "http://www.internationalhelpline.org/helpline",
          },
          {
            number: "844-289-HOPE (4673)",
            title: "H3lpline Help Hope Healing…After the Pain of Abortion",
            link: "https://h3helpline.org/",
          },
          {
            number: "1-800-5WE-CARE",
            title:
              "The National Office of Post-Abortion Reconciliation and Healing (NOPARH)",
            link: "http://www.noparh.org/",
          },
          {
            number: "657-464-7071 (call or text)",
            title: "Abortion Recovery InterNational",
            link: "https://www.abortionpillreversal.com/",
          },
          {
            number: "888-456-HOPE (4673)",
            title: "Project Rachel Helpline",
            link: "http://hopeafterabortion.com/?page_id=39",
          },
          {
            number: "1-877-HOPE-4-ME (467-3463)",
            title: "Rachel’s Vineyard",
            link: "https://www.rachelsvineyard.org/",
          },
          {
            number: "800-NEW-LIFE",
            title: "New Life Ministries",
            link: "https://store.newlife.com/contactus.aspx",
          },
          {
            number: "CALL A-FAMILY (1-800-232-6459)",
            title: "Focus on the Family Christian Counselors Line",
            link: "https://christiancounselors.network/",
          },
        ],
      },
      {
        id: 17,
        text: "I HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT.",
        subQue: false,
        scat: "PRENATAL OR PERINATAL DIAGNOSIS",
        ssubcat: "search in Pregnancy and Infant Loss",
      },
      {
        id: 18,
        text: "I HAD A CHILD PLACED IN FOSTER CARE.",
        subQue: false,
        scat: "CARE FOR CHILDREN",
        ssubcat: "Foster and Short Term Car",
      },
    ],
  },
  19: {
    id: 19,
    question: "I AM CONSIDERING BECOMING AN ADOPTIVE OR FOSTER PARENT.",
    answer: [
      {
        id: 20,
        text: "I AM CONSIDERING ADOPTION.",
        subQue: false,
        scat: "CARE FOR CHILDREN",
        ssubcat: "Adoption Services",
      },
      {
        id: 21,
        text: "I AM CONSIDERING BECOMING A FOSTER PARENT.",
        subQue: false,
        scat: "CARE FOR CHILDREN",
        ssubcat: "Foster and Short Term Care",
      },
    ],
  },
};
