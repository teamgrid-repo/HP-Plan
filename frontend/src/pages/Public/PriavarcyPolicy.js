import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";

const useStyle = makeStyles((theme) => ({
  container: {
    padding: "4em 0px 8em 0px",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  mainTitle: {
    margin: "0 0 80px 0",
    fontFamily: "Montserrat",
    fontSize: "36px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#252222",
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: "21px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "-0.66px",
    textAlign: "left",
    color: "#19191b",
    marginBottom: "24px",
  },
  desc: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "-0.5px",
    textAlign: "left",
    color: "#696871",
    marginBottom: "68px",
  },
}));

const PriavarcyPolicy = (props) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.mainTitle}>Privacy Policy</div>

      <div className={classes.title}>Effective Date 10 Feb 2022</div>
      <div className={classes.desc}>
        Welcome to the Her Pregnancy and Life Assistance Network (“Her PLAN”,
        “us”, “our”, and “we”) located at directory.herplan.org (“Website”). This
        Privacy Policy describes how Her PLAN collects, uses, stores, and shares
        your information when: (1) you access and/or use the Website; (2) you
        access and use the services provided through our Website (“Services”);
        (3) you communicate with us in any way (“Communications”); and (4) we
        interact with certain third-party service providers and partners
        (“Third-Parties”).
      </div>

      <div className={classes.title}>Acknowledgment</div>
      <div className={classes.desc}>
        Please read this Privacy Policy carefully. The practices described
        herein are subject to the laws in the places in which we operate.
        <br />
        <br />
        <b>
          BY ACCESSING AND/OR USING OUR SITE, USING OUR SERVICES, OR BY
          COMMUNICATING WITH US, YOU REPRESENT THAT YOU HAVE READ AND UNDERSTOOD
          THIS PRIVACY POLICY.
        </b>
      </div>

      <div className={classes.title}>
        What Information Do We Collect About You, And How Do We Collect It?
      </div>
      <div className={classes.desc}>
        Depending upon how you interact with our Site, use our Services, the
        nature of our Communications, and the extent to which we interact with
        Third-Parties, we may collect your information: <br />
        <br />
        <ul>
          <li>
            <b> Directly from you</b> when you sign-up for an account with the
            Site, request our Services, and Communicate with us, including but
            not limited to:{" "}
            <ul>
              <li>
                Your name, email address, phone number, street address, username
                and password, feedback, age, gender, and other information you
                provide when using the Site or using our Services;
              </li>
              <li>
                Any information you provide to us when you report a problem with
                our Sites;
              </li>
              <li>
                Any information you download from the Sites, your requests, and
                other related queries to the Sites;
              </li>
              <li>
                Records and copies of your correspondence (e.g., email address)
                if you contact us;
              </li>

              <li>
                Your responses to surveys that we might ask you to complete;
              </li>

              <li>Details of transactions you carry out through our Sites;</li>

              <li>Your search queries on the Sites; and</li>
              <li>
                Information you provide during our onboarding process and
                validation workflows;
              </li>
              <li>
                Your geolocation data to establish location throughout your use
                of the Sites and offer you more direct services.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <b> Automatically</b> when you access or use our Sites, or when you
            Communicate with us, including but not limited to:
            <ul>
              <li>
                Details of your visits to the Sites, including traffic data,
                location data, logs and other communication data;
              </li>

              <li>
                Information about your computer and mobile device, and internet
                connection, including your IP address, operating system, and
                browser type; and
              </li>

              <li>
                Interactivity with an e-mail, including opening, navigating, and
                click-through information.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <b> From Third Parties</b> including but not limited to:
            <ul>
              <li>
                Data analytics providers for the purpose of receiving
                statistical data about your activity on our Sites;
              </li>
              <li>
                Third Party Service Providers, including but not limited to
                internet service providers, fraud prevention services, and
                related partners; and
              </li>
              <li>
                Publicly available information from public sources, including
                local, state, and federal government agencies and departments,
                news sources, and other related databases and sources.
              </li>
            </ul>
          </li>
          <br />
        </ul>
      </div>
      <div className={classes.title}>How Do We Use Your Information?</div>
      <div className={classes.desc}>
        Depending on where you live and how you interact with our Sites, the
        nature of your Communications, and the types of Third Parties with whom
        we interact, we may use your information for a variety of business,
        commercial, and lawful purposes, including to:
        <br />
        <br />
        <ul>
          <li>
            <b>Perform a contract with you to:</b>
            <ul>
              {" "}
              <li>Provide our Sites to you;</li>
              <li>
                Provide you with targeted recommendations from Her PLAN or our
                Her PLAN Providers;
              </li>
              <li>Sign you up to our Sites; </li>
              <li>Notify you about changes to our Sites; </li>
              <li>Enforce our terms, conditions, and policies;</li>
              <li>Administer the Sites;</li>
              <li>
                Personalize content you receive and provide you with tailored
                content; and
              </li>
              <li>Communicate with you.</li>
            </ul>
          </li>
          <br />
          <li>
            <b>Further our interests to:</b>
            <ul>
              <li>
                Perform data analytics (including market research, trend
                analysis, financial analysis);
              </li>
              <li>
                Operate, evaluate, develop, manage and improve our Sites
                (including operating, administering, analyzing, and improving
                our Sites, the publicly available data linked to through our
                Sites, managing and evaluating the effectiveness of our
                Communications, performing accounting, auditing, and billing
                reconciliation and collection activities and other internal
                functions);
              </li>
              <li>
                Protect against, identify and prevent fraud and/or other
                criminal activity, claims and other liabilities; and
              </li>
              <li>
                Comply with and enforce relevant industry standards and
                policies, including this Privacy Policy and other related terms
                of use.
              </li>
              <li>Enhance the algorithm used to provide our Sites.</li>
            </ul>
          </li>
          <br />

          <li>
            <b>
              Comply with a legal obligation, act in the public interest, and/or
              protect the vital interests of our customers and employees by:
            </b>
            <ul>
              <li>Preventing and responding to abuse and fraud;</li>
              <li>Preventing and responding to illegal activity;</li>
              <li>
                Preventing and responding to other harmful content distributed
                through our Sites;{" "}
              </li>
              <li>
                Prevent the unlawful use and/or selling of our Sites; and{" "}
              </li>
              <li>Enforcing our terms, conditions, and policies.</li>
            </ul>
          </li>
          <br />
        </ul>
      </div>
      <div className={classes.title}>How Do We Share Your Information?</div>
      <div className={classes.desc}>
        Depending on the manner in which you engage with our Sites, the nature
        of your Communications, and the manner in which we engage with Third
        Parties, we may disclose or share the information described above for a
        variety of lawful purposes, including:
        <ul>
          <li>
            <b> With your consent.</b> We may disclose or share your information
            with your consent. We may obtain your consent in writing; online,
            through “click-through” agreements; when you accept the terms of use
            on our Sites; orally, either in person or on the phone; or by other
            means.{" "}
          </li>
          <br />
          <li>
            <b> In a business transfer.</b> We may disclose or share your
            information as part of a corporate business transaction, such as a
            merger or acquisition, joint venture, corporate reorganization,
            financing, or sale of company assets, or in the unlikely event of
            insolvency, bankruptcy, or receivership, in which such information
            could be transferred to third parties as a business asset in the
            transaction.
          </li>
          <br />
          <li>
            <b> To non-affiliated third parties.</b> We may disclose or share
            your information with certain third parties to facilitate your
            access and use of our Sites, including but not limited to internet
            service providers, advertising networks, data analytics providers,
            governmental entities, operating systems and platforms, social
            medial networks, and service providers who provide us a service
            (e.g., credit / debit card processing, billing, shipping, repair,
            customer service, auditing, marketing, debugging to identify and
            repair errors that impair existing intended functionality on our
            Sites, and/or protecting against malicious, deceptive, fraudulent,
            or illegal activity).
          </li>
          <br />
          <li>
            <b> To subsidiaries and affiliates.</b> We may disclose or share
            your information with our subsidiaries and affiliates to further
            facilitate your use of our Sites, and to ensure the smooth and
            consistent operations of Her PLAN by identifying and repairing
            errors that impede intended functionality and to protect against
            malicious, deceptive, fraudulent, or illegal activity.
          </li>
          <br />
          <li>
            <b> For legal process and protection.</b> We may disclose or share
            your information to satisfy any law, regulation, legal process,
            governmental request, or where we have a good faith belief that
            access, use, preservation or disclosure of such information is
            reasonably necessary to:
            <ul>
              <li>Enforce or apply agreements.</li>
              <li>
                Protect our rights or interests, property or safety or that of
                others;
              </li>

              <li>
                In connection with claims, disputes, or litigation - in court or
                elsewhere;
              </li>

              <li>
                Protect users of our Sites and other carriers or providers from
                fraudulent, abusive, or unlawful use of, or subscription to,
                such services;
              </li>
              <li>
                Facilitate or verify the appropriate calculation of taxes, fees,
                or other obligations due to a local, state, or federal
                government;
              </li>
            </ul>
          </li>
          <br />
        </ul>
      </div>
      <div className={classes.title}>
        Do We Transfer Your Information To Other Countries?
      </div>
      <div className={classes.desc}>
        The information we collect from and about you may be stored on servers
        with Third Parties in the United States (where we are headquartered) or
        any other country in which we do business, and whose laws may differ
        from the jurisdiction in which you live. Any transfer of your
        information will be done with reasonable consideration of the applicable
        laws in the jurisdictions in which we operate.
      </div>

      <div className={classes.title}>Links To Third Party Sites</div>
      <div className={classes.desc}>
        Our Sites may contain links to third party websites and services. Please
        note that these links are provided for your convenience and information,
        and the websites and services may operate independently from us and have
        their own privacy policies or notices, which we strongly suggest you
        review. This Privacy Notice applies to our Sites, and we do not accept
        any responsibility or liability for the policies or practices of any
        third parties.{" "}
      </div>

      <div className={classes.title}>Third Party Tracking / Do Not Track</div>
      <div className={classes.desc}>
        We may, from time to time, collect information about your online
        activities, over time and across our different Sites. When you use our
        Sites, Third Parties may also collect information about your online
        activities, over time and across different internet websites, online or
        cloud computing services, online applications, or mobile applications.
        Some browsers support a “Do Not Track” feature, which is intended to be
        a signal to websites that you do not wish to be tracked across different
        websites you visit. Our Sites do not currently change the way they
        operate based upon detection of a “Do Not Track” or similar signal.
      </div>

      <div className={classes.title}>Social Media Integration</div>
      <div className={classes.desc}>
        Our Sites may, from time to time, contain links to and from social media
        platforms. You may choose to connect to us through a social media
        platform, such as Google, Apple, or LinkedIn. We encourage you to review
        their usage and disclosure policies and practices, including their data
        security practices, before using the social media platforms.
      </div>

      <div className={classes.title}>
        How Do We Store and Protect Your Information?
      </div>
      <div className={classes.desc}>
        Although no system can guarantee the complete security of your
        information, we take all commercially reasonable steps to ensure your
        information is protected in alignment with all applicable laws and
        regulations, as appropriate to the sensitivity of your information.{" "}
      </div>

      <div className={classes.title}>
        How Long Do We Keep Your Personal Information?
      </div>
      <div className={classes.desc}>
        We keep your information that we collect for as long as necessary in
        accordance with the purpose for which it was collected, our business
        needs, and our legal and regulatory obligations. If we dispose of your
        information, we will do so in a way that is secure and appropriate to
        nature of the information subject to disposal.{" "}
      </div>

      <div className={classes.title}>Cookies and Related Technology</div>
      <div className={classes.desc}>
        We may use cookies, beacons, pixel tags, scripts, and other similar
        technologies from time to time to support the functionality of our
        Sites. A cookie is a piece of information contained in a very small text
        file that is stored in your Internet browser or elsewhere on your hard
        drive. Cookies are transferred from our Sites to your computer, phone or
        tablet, and allow us to identify your device whenever you return to our
        Sites. These technologies provide a better experience when you use our
        Sites, and allow us to improve our services. We may also use analytic
        software, such as Google Analytics and others, to help better understand
        how our Sites function on your device(s) and for other analytical
        purposes. To learn more about how Google uses data when you use our
        Sites, see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
        >
          How Google uses data when you use our partners’ sites or apps.{" "}
        </a>
        You can opt-out of Google Analytics by installing Google’s opt-out
        browser add-on here{" "}
        <a href=" https://tools.google.com/dlpage/gaoptout" target="_blank">
          {" "}
          https://tools.google.com/dlpage/gaoptout.
        </a>
        <br />
        <br />
        Below is an overview of the types of cookies and related technology we
        deploy, and your choices.
        <br />
        <br />
        <b> Browser Cookies.</b> A browser cookie is a small file placed on the
        hard drive of your computer. That cookie then communicates with servers,
        ours or those of other companies that we authorize to collect data for
        us and allows recognition of your personal computer. You may use the
        tools available on your computer or other device(s) to set your browser
        to refuse or disable all or some browser cookies, or to alert you when
        cookies are being set. However, if you refuse or disable all browser
        cookies, you may be unable to access certain parts or use certain
        features or functionality of our Sites. Unless you have adjusted your
        browser settings so that it refuses all cookies, we may use cookies when
        you direct your browser to our Sites.
        <br />
        <br />
        <b> Beacons.</b>Our Sites and e-mails may contain small electronic files
        known as beacons (also referred to as web beacons, clear GIFs, pixel
        tags and single-pixel GIFs) that permit us to, for example, to count
        users who have visited those pages or opened an e-mail and for other
        website-related statistics. Beacons in e-mail marketing campaigns allow
        us to track your responses and your interests in our content, offerings
        and web pages. You may use the tools in your device to disable these
        technologies as well.
        <br />
        <br />
        <b> Third Party Technology.</b>Our service providers, advertising
        partners, and ad networks may also use cookies and beacons to collect
        and share information about your activities both on our Sites and on
        other websites and applications. In addition, third parties that are
        unaffiliated with us may also collect information about you, including
        tracking your browsing history, when you use our Sites. We do not have
        control over these third party collection practices. If you wish to
        minimize these third party collections, you can adjust the settings of
        your browsers or install plug-ins and add-ins.
        <br />
        <br />
        You may wish to restrict the use of cookies or completely prevent them
        from being set. Most browsers provide for ways to control cookie
        behavior, such as the length of time they are stored. If you disable
        cookies, please be aware that some of the features of our Sites may not
        function correctly. To find out more on how to manage and delete
        cookies, visit www.aboutcookies.org. For more details on your choices
        regarding use of your web browsing activity for interest-based
        advertising, you may visit the following sites:
        <ul>
          <li>
            <a href="http://networkadvertising.org/" target="_blank">
              http://networkadvertising.org/
            </a>
          </li>
          <br />

          <li>
            <a href="http://optout.aboutads.info/" target="_blank">
              http://optout.aboutads.info/
            </a>
          </li>
          <br />

          <li>
            <a href="http://youradchoices.com/" target="_blank">
              http://youradchoices.com/
            </a>
          </li>
          <br />
        </ul>
      </div>

      <div className={classes.title}>Your Choices</div>
      <div className={classes.desc}>
        We provide you the ability to exercise certain controls and choices
        regarding your information. To exercise any of the rights described
        below, send your request to Info@herplan.org or Contact Us below. We
        will respond to your request as possible and in accordance with all
        applicable laws and regulations. You may submit your request directly,
        or through an authorized agent, subject to additional verification of
        your identity and/or the agent’s authorization. To protect your
        identity, we may also use reasonable efforts, consistent with applicable
        law, to verify your identity before responding to your request.
        <ul>
          <li>
            <b> Correct Your Information.</b> If you believe we have incorrect
            or inaccurate information about you, we will use reasonable efforts
            to allow you to update or correct the information we collect from
            and about you. Please note, some data we may have about you comes
            from Third Party sources, from which we cannot amend the
            information. For those Third Party sources, you will need to submit
            your request directly to the original source of the information.
          </li>
          <br />
          <li>
            <b> Access Your Information.</b> Subject to the laws in the
            jurisdictions in which you live and we operate, you may have a right
            to know what information we have collected about or from you, how
            that information is being used, and with whom it is being shared.
            Please note, this right may not extent to publicly available
            information that is linked to through our Sites. Depending on where
            you live, you may also be entitled to receive a copy of your
            information.
          </li>
          <br />
          <li>
            <b> Delete Your Information.</b> Subject to the laws in the
            jurisdictions in which you live and we operate, and subject to
            certain exceptions recognized by applicable law, you may have a
            right to ask that we delete your information. Please note, this
            right may not extend to publicly available information that is
            linked to through our Sites.
          </li>
          <br />
          <li>
            <b> Control Cookies Through Your Browsers.</b> You may be able to
            disable and manage some cookies through your browser settings. If
            you use multiple browsers on the same device, you will need to
            manage your settings for each browser.{" "}
          </li>
          <br />
          <li>
            <b> Analytics Provider Opt-Outs.</b> To disable analytics cookies
            you can use the browser controls discussed above or, for some of our
            providers (e.g. Google), you can use their individual opt-out
            mechanisms.{" "}
          </li>
          <br />
          <li>
            Interest-Based Advertising. For more information or to opt-out of
            receiving interest-based advertising from participating third-party
            advertisers please visit: Digital Advertising Alliance:{" "}
            <a href="https://optout.aboutads.info/?c=2&lang=EN" target="_blank">
              https://optout.aboutads.info/?c=2&lang=EN
            </a>{" "}
            Digital Advertising Alliance App Choices Application:{" "}
            <a href="www.aboutads.info/appchoices" target="_blank">
              www.aboutads.info/appchoices
            </a>{" "}
            Network Advertising Initiative:{" "}
            <a
              href="https://optout.networkadvertising.org/?c=1"
              target="_blank"
            >
              https://optout.networkadvertising.org/?c=1
            </a>{" "}
          </li>
          <br />
          <li>
            <b> Email Opt-Out.</b> If at any time you wish to opt out or
            "unsubscribe" from receiving emails related to our Sites, you may
            use the unsubscribe link at the bottom of each email you receive.
            Please note that even if you opt-out of receiving emails from us, we
            reserve the right to send transactional or relationship
            communications to you (e.g., if we need to contact you regarding
            your account status, technical support, changes to our Sites or
            Services, etc.).
          </li>
          <br />
        </ul>
        If you have questions or complaints about how we’ve handled your
        information, or responded to any requests above, please contact us
        below. You also have the right, depending on where you live, to file a
        complaint with any competent data protection authority, regulator, or
        governmental agency, where appropriate.
      </div>

      <div className={classes.title}>Children</div>
      <div className={classes.desc}>
        Our Sites are not intended for children under the age of 13. This
        includes any links to other websites that we provide for our
        convenience. We don’t knowingly collect the information of children for
        any reason.{" "}
      </div>

      <div className={classes.title}>International Jurisdictions </div>
      <div className={classes.desc}>
        Our Sites are hosted and offered in the United States of America (US),
        and are subject to US federal, state, and local law. If you are
        accessing the Sites from another country, please be advised that you may
        be transferring your information to us in the US, and you consent to
        that transfer and use of your information in accordance with this
        Policy. If your use of the Sites would be unlawful in your jurisdiction,
        you may not use Sites.{" "}
      </div>

      <div className={classes.title}>Changes To Our Privacy Policy</div>
      <div className={classes.desc}>
        We may change this Policy from time to time. Any and all changes will be
        reflected on this page, and where appropriate provided in person or by
        another electronic method. The effective date will be stated at the top
        of this Policy. You should regularly check this page for any changes to
        this Privacy Notice. <br />
        <br />
        <b>
          YOUR CONTINUED USE, ACCESS, OR INTERACTION WITH THE SITES, OR YOUR
          CONTINUED COMMUNICATIONS WITH US AFTER THE UPDATED POLICY HAS BEEN
          POSTED WILL REPRESENT THAT YOU HAVE READ AND UNDERSTOOD THIS POLICY.{" "}
        </b>
      </div>

      <div className={classes.title}>Contact Us</div>
      <div className={classes.desc}>
        Her PLAN <br />
        <a href="mailto:Info@herplan.org">Info@herplan.org</a> <br />
        (202) 223-8073 <br />
        2800 Shirlington Road, Ste. 1200 <br />
        Arlington, VA 22206 <br />
      </div>
    </div>
  );
};

export default PriavarcyPolicy;
