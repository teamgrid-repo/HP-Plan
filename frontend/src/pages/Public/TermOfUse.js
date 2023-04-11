import { makeStyles } from "@mui/styles";

import { useDispatch } from "react-redux";

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

const TermOfUse = (props) => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.mainTitle}>Terms & Conditions</div>
      <div className={classes.title}>Acknowledgment and Terms </div>
      <div className={classes.desc}>
        Please read these Terms of Use (“Terms”) carefully before accessing
        and/or using the website at directory.herplan.org (“Site”), owned and operated
        by the Pregnancy and Life Assistance Network, a product of the Susan B.
        Anthony List Education Fund, Inc. (“Her PLAN”, “us”, “we”, “our”). By
        accessing and/or using the Site, you agree to be bound by these Terms.
        If you do not agree to these Terms, you must not access and/or use the
        Site. Any objection to these Terms, or any part therefore, will be
        interpreted as a refusal to agree to these Terms.   {" "}
      </div>
      <div className={classes.title}>Changes </div>
      <div className={classes.desc}>
        HER PLAN reserves the right to make changes to this Terms at any time
        and at our discretion. Any new feature or tools which are added to the
        Site shall be subject to this Terms, as amended. New versions of  this
        Terms will not apply retroactively, but shall immediately replace and
        supersede the previous Terms upon posting. Your continued access and use
        of the Site, or any part thereof, following the posting of the revised
        Terms means that you accept and agree to the changes. 
      </div>
      <div className={classes.title}>Notice to Adverse Organizations</div>
      <div className={classes.desc}>
        In addition to the restricted uses outlined in Section 6 below,
        organizations that advocate for public policy positions that
        are adverse to Her PLAN, including but not limited to organizations that
        advocate for certain access to abortion services, are prohibited from
        reproducing, copying any part of, screenshotting, or using any part of
        the Site, including without limitation information, documents (such as
        directories, guidebooks, or other materials) and other content contained
        on the Site. 
      </div>

      <div className={classes.title}>Media Inquiries </div>
      <div className={classes.desc}>
        For media inquiries, please contact Prudence Robertson
        at probertson@sbalist.org for permission to reproduce or make copies of
        any part of the Site, including without limitation, any of the
        information, documents (such as directories, guidebooks, and other
        materials) and other content contained on the Site. 
      </div>

      <div className={classes.title}>Arbitration Notice </div>
      <div className={classes.desc}>
        YOU AGREE THAT DISPUTES BETWEEN YOU AND US CONCERNING YOUR USE OF THE
        SITE AND/OR HOW OUR SITE OPERATES WILL BE RESOLVED BY BINDING,
        INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A
        CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION. FOR MORE DETAILS ON THIS
        PROCESS, AND HOW YOU CAN OPT-OUT OF ARBITRATION, SEE SECTION 24 BELOW. 
      </div>

      <div className={classes.title}>Eligibility</div>
      <div className={classes.desc}>
        By accessing and/or using the Site, you represent that you are at the
        age of consent in the jurisdiction in which you access and/or use the
        Site, to create an account and use the Site. Her PLAN is not
        directed to children under the age of 13. By creating an account and
        using the Site, you represent and warrant that: 
        <ul>
          <li>You can form a binding contract with HER PLAN</li>
          <br />
          <li>
            You are not a person who is barred from using HER PLAN under the
            laws of the United States or any other applicable jurisdiction
            (i.e., you do not appear on the U.S. Treasury Department list of
            Specially Designated Nationals or face any other similar prohibition
          </li>
          <br />
          <li>
            You will comply with these Terms and all applicable local, state,
            national, and international laws, rules, and regulations.
          </li>
          <br />
        </ul>
        <span style={{ fontWeight: 500, color: "#000" }}>
          Notice to Parents.
        </span>{" "}
        If you have any concerns about Her PLAN or its related services, please
        contact us at info@herplan.org .
      </div>
      <div className={classes.title}>Conduct When Using the Site </div>
      <div className={classes.desc}>
        By accessing and/or using the Site, you agree not to:
        <ul>
          <li>
            Use the Site for any purpose that runs contrary to these Terms.
          </li>
          <br />
          <li>
            Use the Site in any manner contrary to local, state, federal, or
            international laws.
          </li>
          <br />
          <li>
            Use the Site for any commercial purpose without our prior consent.
          </li>
          <br />
          <li>
            Copy, modify, transmit, create any derivative works from, make use
            of, or reproduce in any way any copyrighted materials, images,
            trademarks, trade names, service marks, or other intellectual
            property, content or proprietary information accessible through the
            Site without our prior consent.
          </li>
          <br />
          <li>
            Express or imply that any statements you make are endorsed by Her
            PLAN.
          </li>
          <br />
          <li>
            Use any robot, bot, spider, crawler, scraper, site search/retrieval
            application proxy or other manual or automatic device method or
            process to access, retrieve, index, "data mine," or in any way
            reproduce or circumvent the navigational structure or presentation
            of the Site or their content
          </li>
          <br />

          <li>
            Upload viruses or other malicious code or otherwise compromise the
            security of the Site.
          </li>
          <br />
          <li>
            Forge headers or otherwise manipulate identifiers in order to
            disguise the origin of any information transmitted to or through the
            Site.
          </li>
          <br />
          <li>
            “Frame” or “mirror” any part of the Site without our prior written
            consent.
          </li>
          <br />
          <li>
            Use meta tags or code or other devices containing any reference to
            Her PLAN (or any trademark, trade name, service mark, logo or slogan
            of Her PLAN) to direct any person to any other website for any
            purpose.
          </li>
          <br />
          <li>
            Use or develop any third-party application that interacts with the
            Site without our prior written consent.
          </li>
          <br />
          <li>
            Probe, scan, or test the vulnerability of our Site or any system or
            network.
          </li>
          <br />
          <li>Encourage or promote any activity that violates this Terms.</li>
          <br />
        </ul>
      </div>
      <div className={classes.title}>
        Links to other Sites and Third Parties
      </div>
      <div className={classes.desc}>
        Our Site may contain links to third-party websites or services that are
        not owned or controlled by Her PLAN. Her PLAN has no control over, and
        assumes no responsibility for the content, accuracy, privacy policies,
        or practices of any third-party website or services so linked. Her PLAN
        strongly urges you to read the terms and conditions and privacy policies
        of any third-party website or services you visit.
      </div>

      <div className={classes.title}>Privacy</div>
      <div className={classes.desc}>
        By agreeing to this Terms, you also confirm that you have read and
        understand our Privacy Policy, available here.
      </div>

      <div className={classes.title}>Copyright Infringement Policy</div>
      <div className={classes.desc}>
        In alignment with the Digital Millennium Copyright Act (“DMCA”), we have
        established the procedure outlined below to address any alleged
        copyright infringement on the Site. If you believe your work has been
        copied and has been posted on the Site in a way that constitutes
        copyright infringement, you may provide us with notice of your complaint
        by contacting us with the following information, in writing: 
        <ul>
          <li>
            The electronic or physical signature of the owner of the copyright
            or a person authorized to act on the owner’s behalf;
          </li>
          <br />
          <li>
            Identification of the copyrighted work that you claim has been
            infringed;
          </li>
          <br />
          <li>
            Identification of the material that is claimed to be infringing,
            with information about its location reasonably specific to permit us
            to locate the material;
          </li>
          <br />

          <li>Your name, address, telephone number, and email address;</li>
          <br />
          <li>
            A statement by you that you have a good faith belief that the
            disputed use is not authorized by the copyright owner, its agent, or
            the law
          </li>
          <br />
          <li>
            A statement, made under penalty of perjury, that the above
            information in your notification is accurate and that you are the
            copyright owner or are authorized to act on the copyright owner’s
            behalf.
          </li>
          <br />
        </ul>
        After receiving a notification, we will process and investigate the
        notification and will take appropriate actions under the DMCA and other
        applicable intellectual property laws. Upon receipt of a notification
        that complies or substantially complies with the DMCA (as set forth
        above), we will act expeditiously to remove or disable access to any
        material claimed to be infringing or claimed to be the subject of
        infringing activity, and will act expeditiously to remove or disable
        access to any reference or link to material or activity that is claimed
        to be infringing. We will promptly take reasonable steps to notify the
        member that is the subject of the notification that it has removed or
        disabled access to such material. 
      </div>

      <div className={classes.title}>Modifying the Site / Termination</div>
      <div className={classes.desc}>
        Her PLAN is always striving to improve its Site and bring you additional
        functionality that you will find engaging and useful. This means we may
        add new product features or enhancements from time to time, as well as
        remove some features. If these actions do not materially impact your
        rights or obligations, we may not provide you with notice of these
        changes before making them. We may also suspend the Site entirely, in
        which event we will notify you in advance unless extenuating
        circumstances, such as safety or security concerns, prevent us from
        doing so.
      </div>

      <div className={classes.title}>Non-Endorsement of Results</div>
      <div className={classes.desc}>
        Her PLAN does not endorse any content promoted through the use of the
        Site, and is not responsible or liable for any content or results on the
        Site, even if such results could be unlawful, harassing, libelous,
        violate privacy, abusive, threatening, harmful, vulgar, obscene, or
        otherwise objectionable, or that it infringes or may infringe upon the
        intellectual property or other rights of another. Her PLAN reserves the
        right in its sole discretion to refuse, edit, move, or remove any
        content that is available through the Site.
      </div>

      <div className={classes.title}>
        Copyright, Trademark, and other Intellectual Property{" "}
      </div>
      <div className={classes.desc}>
        You acknowledge that the Site and all materials on the Site, including
        without limitation to the Site’ design, text, graphics, sounds,
        pictures, software and other files, its look and feel, and the selection
        and arrangement thereof (collectively, “Materials”) are our property and
        are subject to and protected by United States and international
        copyright or other intellectual property laws and rights. The
        trademarks, service marks, trade dress, trade names, and logos contained
        on the Site, including without limitation to trademarks registered in
        the United States (collectively, “Marks”) are the sole property of Her
        PLAN. In addition, all page headers, custom graphics, and custom icons
        are Marks of Her PLAN.
        <br />
        <br />
        Subject to the limitations stated herein regarding the use of the Site,
        and copying materials on the Site, Her PLAN grants you a personal,
        worldwide, royalty-free, non-assignable, nonexclusive, revocable, and
        non-sublicensable license to access and use the Site. This license is
        for the sole purpose of letting you use and enjoy the Site as intended
        by Her PLAN, and as permitted by this Terms. All rights not expressly
        granted herein are reserved by Her PLAN. Other copyrights, trademarks,
        product names, company names, logos or intellectual property are the
        property of the respective owners with all rights reserved. Site
        references to third parties or their copyrights, trademarks, or other
        intellectual property do not constitute or imply affiliation with,
        endorsement of, or recommendation of Her PLAN by the respective
        trademark owner(s), or by Her PLAN of the respective trademark owner(s).
      </div>

      <div className={classes.title}>
        Copyright, Trademark, and other Intellectual Property{" "}
      </div>
      <div className={classes.desc}>
        You acknowledge that the Site and all materials on the Site, including
        without limitation to the Site’ design, text, graphics, sounds,
        pictures, software and other files, its look and feel, and the selection
        and arrangement thereof (collectively, “Materials”) are our property and
        are subject to and protected by United States and international
        copyright or other intellectual property laws and rights. The
        trademarks, service marks, trade dress, trade names, and logos contained
        on the Site, including without limitation to trademarks registered in
        the United States (collectively, “Marks”) are the sole property of Her
        PLAN. In addition, all page headers, custom graphics, and custom icons
        are Marks of Her PLAN.
        <br />
        <br />
        Subject to the limitations stated herein regarding the use of the Site,
        and copying materials on the Site, Her PLAN grants you a personal,
        worldwide, royalty-free, non-assignable, nonexclusive, revocable, and
        non-sublicensable license to access and use the Site. This license is
        for the sole purpose of letting you use and enjoy the Site as intended
        by Her PLAN, and as permitted by this Terms. All rights not expressly
        granted herein are reserved by Her PLAN. Other copyrights, trademarks,
        product names, company names, logos or intellectual property are the
        property of the respective owners with all rights reserved. Site
        references to third parties or their copyrights, trademarks, or other
        intellectual property do not constitute or imply affiliation with,
        endorsement of, or recommendation of Her PLAN by the respective
        trademark owner(s), or by Her PLAN of the respective trademark owner(s).
      </div>

      <div className={classes.title}>
        Disclaimer of Warranties; Limitation of Liability; Indemnification{" "}
      </div>
      <div className={classes.desc}>
        <ul>
          <li>
            DISCLAIMER OF WARRANTIES. SUBJECT TO APPLICABLE LAW, HER PLAN MAKES
            THE FOLLOWING DISCLAIMERS OF WARRANTIES. HER PLAN DISCLAIMS ANY AND
            ALL RESPONSIBILITY OR LIABILITY FOR THE ACCURACY, CONTENT,
            COMPLETENESS, LEGALITY, RELIABILITY, OR OPERABILITY OR AVAILABILITY
            OF INFORMATION OR MATERIAL DISPLAYED ON THE SITE. HER PLAN DISCLAIMS
            ANY RESPONSIBILITY OR LIABILITY FOR THE DELETION, FAILURE TO STORE,
            MISDELIVERY, OR UNTIMELY DELIVERY OF ANY INFORMATION OR MATERIAL
            MADE AVAILABLE THROUGH THE SITE. HER PLAN DISCLAIMS ANY
            RESPONSIBILITY OR LIABILITY FOR ANY HARM RESULTING FROM DOWNLOADING
            OR ACCESSING INFORMATION OR MATERIAL ON THE INTERNET THROUGH THE
            SITE. HER PLAN PROVIDES THE SITE ON AN “AS IS” AND “AS AVAILABLE”
            BASIS WITH NO WARRANTIES WHATSOEVER. HER PLAN EXPRESSLY DISCLAIMS TO
            THE FULLEST EXTENT PERMITTED BY LAW ALL EXPRESS, IMPLIED, AND
            STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE WARRANTY OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT OF PROPRIETARY RIGHTS. HER PLAN FURTHER DISCLAIMS
            ANY WARRANTIES REGARDING THE SECURITY, RELIABILITY, TIMELINESS, AND
            PERFORMANCE OF THE SITE. HER PLAN FURTHER DISCLAIMS ANY WARRANTIES
            RELATING TO ANY INFORMATION OBTAINED THROUGH THE SITE, ANY LINKS
            PROVIDED BY THE SITE, AS WELL AS ANY INFORMATION RECEIVED THROUGH
            ANY OF THE LINKS PROVIDED IN THE SITE.
          </li>
          <br />
          <li>
            LIMITATION OF LIABILITY. SUBJECT TO APPLICABLE LAW, UNDER NO
            CIRCUMSTANCES SHALL HER PLAN BE LIABLE TO ANY USER OF THE SITE, OR
            ANY OTHER THIRD PARTY THAT HAS AGREED TO THIS TERMS, FOR ANY DIRECT,
            INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, AND/OR
            PUNITIVE DAMAGES, WHETHER SUCH DAMAGES OR A CLAIM FOR SUCH DAMAGES
            IS BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
            OTHER CLAIM AVAILABLE UNDER APPLICABLE LAW, EVEN IF HER PLAN HAS
            BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SUCH LIMITATION OF
            LIABILITY SHALL APPLY WHETHER THE DAMAGES ARISE FROM USE OR MISUSE
            OF AND RELIANCE ON THE SITE, FROM INABILITY TO USE THE SITE, OR FROM
            THE INTERRUPTION, SUSPENSION, OR TERMINATION OF THE SITE (INCLUDING
            SUCH DAMAGES INCURRED BY ANY THIRD PARTIES). THIS LIMITATION SHALL
            ALSO APPLY WITH REGARD TO DAMAGES INCURRED BY REASON OF OTHER
            SERVICES OR GOODS RECEIVED THROUGH THE SITE OR RECEIVED THROUGH
            LINKS PROVIDED ON THE SITE, AS WELL AS BY REASON OF ANY INFORMATION
            OR ADVICE RECEIVED THROUGH THE SITE OR THROUGH LINKS PROVIDED ON THE
            SITE. THIS LIMITATION SHALL ALSO APPLY, WITHOUT LIMITATION, TO THE
            COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOST PROFITS,
            LOST DATA, LOSS OF BUSINESS GOODWILL, LOSS OF REPUTATIONAL GOODWILL,
            OR OTHER SUCH DAMAGES. SUCH LIMITATION SHALL FURTHER APPLY WITH
            REGARD TO THE PERFORMANCE OR NON-PERFORMANCE OF THE SITE OR ANY
            INFORMATION THAT APPEARS ON, OR IS LINKED OR RELATED IN ANY WAY TO
            THE SITE. TO THE EXTENT ANY SUCH DAMAGES ARE REQUIRED BY APPLICABLE
            LAW, THEY SHALL BE CAPPED AT ONE HUNDRED DOLLARS ($100) (US).
          </li>
          <br />
          <li>
            INDEMNITY. YOU AGREE, TO THE EXTENT PERMITTED UNDER APPLICABLE LAW,
            TO INDEMNIFY, DEFEND, AND HOLD HARMLESS HER PLAN AND ITS RESPECTIVE
            OFFICERS, DIRECTORS, AGENTS, AND EMPLOYEES FROM ANY AND ALL
            COMPLAINTS, DEMANDS, CLAIMS, DAMAGES, LOSSES, COSTS (INCLUDING
            ATTORNEYS’ FEES), PENALTIES AND/OR OTHER EXPENSES, DUE TO, ARISING
            OUT OF, OR RELATING IN ANY WAY TO YOUR ACCESS OR USE OF THE SITE, OR
            YOUR VIOLATION OF THIS TERMS.
          </li>
          <br />
        </ul>
      </div>
      <div className={classes.title}>Force Majeure</div>
      <div className={classes.desc}>
        Under no circumstances shall Her PLAN be held responsible or liable for
        any delay or failure in performance resulting directly or indirectly
        from acts of nature, forces, or causes beyond its reasonable control,
        including, without limitation, Internet failures, computer equipment
        failures, telecommunication equipment failures, other equipment
        failures, electrical power failures, strikes, labor disputes, riots,
        insurrections, civil disturbances, shortages of labor or materials,
        fires, floods, storms, explosions, acts of God, war (including but not
        limited to cyber related events and/or occurrences attributed to state
        and/or quasi-state actors by either public or privacy organizations
        and/or entities and/or governments), governmental actions, orders of
        domestic or foreign courts or tribunals, non-performance of third
        parties, or loss of or fluctuations in heat, lighting, or air
        conditioning.
      </div>

      <div className={classes.title}>
        Dispute Resolution, Arbitration, Class-Action Waiver, and Jury Waiver
      </div>
      <div className={classes.desc}>
        EXCEPT WHERE PROHIBITED BY LAW, YOU AND HER PLAN AGREE THAT ALL CLAIMS,
        DISPUTES OR CONTROVERSIES BETWEEN YOU AND HER PLAN (including disputes
        against any agent employee, subsidiary, affiliate, predecessor in
        interest, successor, or assign of the other), relating to our Site, or
        Content or Marks published by Her PLAN on the Site, any transaction or
        relationship between us resulting from your use of our Site,
        communications between us, the information provided in connection with
        our Site, and INCLUDING, WITHOUT LIMITATION, TORT AND CONTRACT CLAIMS,
        CLAIMS BASED UPON ANY INTERNATIONAL, FEDERAL, STATE OR LOCAL STATUTE,
        LAW, ORDER, ORDINANCE OR REGULATION, AND THE ISSUE OF ARBITRABILITY,
        SHALL BE RESOLVED BY THE FINAL AND BINDING ARBITRATION PROCEDURES SET
        BELOW.
        <br />
        <br />
        THE PARTIES ACKNOWLEDGE AND AGREE THAT ANY SUCH CLAIMS SHALL BE BROUGHT
        SOLELY IN THE PARTY'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR
        CLASS MEMBER IN ANY PURPORTED CLASS, REPRESENTATIVE PROCEEDING. THE
        PARTIES FURTHER AGREE THAT THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN
        ONE PERSON'S CLAIMS, AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A
        REPRESENTATIVE OR CLASS PROCEEDING. THE PARTIES VOLUNTARILY AND
        KNOWINGLY WAIVE ANY RIGHT THEY HAVE TO A JURY TRIAL. ANY CONTROVERSY
        CONCERNING WHETHER A DISPUTE IS ARBITRABLE SHALL BE DETERMINED BY THE
        ARBITRATOR AND NOT BY THE COURT. JUDGMENT UPON ANY AWARD RENDERED BY THE
        ARBITRATOR MAY BE ENTERED BY A DELAWARE STATE OR FEDERAL COURT HAVING
        JURISDICTION THEREOF. THIS ARBITRATION CONTRACT IS MADE PURSUANT TO A
        TRANSACTION IN INTERSTATE COMMERCE AND ITS INTERPRETATION, APPLICATION,
        ENFORCEMENT AND PROCEEDINGS HEREUNDER SHALL BE GOVERNED BY THE FEDERAL
        ARBITRATION ACT ("FAA").
        <br />
        <br />
        The following procedures shall apply:
        <br />
        In the event a party elects to proceed with binding arbitration, it
        shall provide written notice thereof to the other party by registered or
        certified mail and shall describe in such notice, with reasonable
        particularity, the nature and basis of such claim and the total amount
        of the claim. Within thirty (30) days of receipt of such notice, the
        party receiving notice of a claim shall provide a written response
        which, with reasonable particularity, sets forth its position concerning
        the claim. If the parties are unable to resolve the dispute arising from
        the claim by good faith negotiations to be conducted within the thirty
        (30)-day period following the written response, either of them may
        initiate binding arbitration pursuant to the terms and conditions set
        forth herein. The arbitration will be governed by the Commercial Dispute
        Resolution Procedures and the Supplementary Procedures for Consumer
        Related Disputes (collectively, “AAA Rules”) of the American Arbitration
        Association (“AAA”) and will be administered by the AAA. If the AAA is
        unavailable or refuses to arbitrate the parties’ dispute for any reason,
        the arbitration shall be administered and conducted by a
        widely-recognized arbitration organization that is mutually agreeable to
        the parties, but neither party shall unreasonably withhold their
        consent. The AAA Rules are available online at www.adr.org. Unless
        otherwise agreed, the arbitration shall take place in Arlington County,
        Virginia, but may proceed telephonically in the event the total amount
        of the claim does not exceed $2,500 U.S. dollars (if the claimant so
        chooses).
        <br />
        <br />
        BY AGREEING TO THIS ARBITRATION TERMS, YOU ARE GIVING UP YOUR RIGHT TO
        GO TO COURT, INCLUDING YOUR RIGHT TO A JURY TRIAL. In arbitration, a
        dispute is resolved by a neutral arbitrator or panel of arbitrators,
        rather than by a judge or jury. Arbitration is more informal than a
        court trial; however, an arbitrator can award the same relief that a
        court can award.
        <br />
        <br />
        Separate and apart from these Terms to arbitrate set forth above, the
        parties hereby independently waive any right to bring or participate in
        any class action in any way related to, or arising from, this Terms. You
        acknowledge that this class action waiver is material and essential to
        the arbitration of any disputes between the parties and is nonseverable
        from the Terms to arbitrate claims. If any portion of this class action
        waiver is limited, voided, or cannot be enforced, then the parties’
        Terms to arbitrate shall be null and void. YOU UNDERSTAND THAT BY
        AGREEING TO THIS ARBITRATION TERMS, WHICH CONTAINS THIS CLASS ACTION
        WAIVER, YOU MAY ONLY BRING CLAIMS AGAINST HER PLAN, ITS AGENTS,
        OFFICERS, SHAREHOLDERS, MEMBERS, EMPLOYEES, SUBSIDIARIES, AFFILIATES,
        PREDECESSORS IN INTEREST, SUCCESSORS AND/OR ASSIGNS IN AN INDIVIDUAL
        CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS
        ACTION OR REPRESENTATIVE PROCEEDING. IF YOU DO NOT AGREE TO THIS
        ARBITRATION TERMS AND CLASS ACTION WAIVER, YOU MUST TELL US IN WRITING
        AND NOT USE OUR SITE.
      </div>

      <div className={classes.title}>Governing Law; Jurisdiction and Venue</div>
      <div className={classes.desc}>
        This Terms will be governed by and construed in accordance with the laws
        of the Commonwealth of Virginia, without giving effect to its conflict
        of laws provisions or the laws of your state. If for any reason a court
        of competent jurisdiction or arbitrator finds any provision or portion
        of this Terms to be unenforceable, the remaining portion of this Terms
        will continue in full force and effect.
      </div>

      <div className={classes.title}>Terms Termination</div>
      <div className={classes.desc}>
        This Terms are effective until terminated either by Her PLAN or you. We,
        in our sole discretion, may suspend or terminate this Terms at any time
        with or without prior notice, and may deny you access to the Site or any
        portion thereof as a result. You may also terminate this Terms at any
        time by discontinuing your use of the Site and terminating your account.
        Upon termination of this Terms by us or you, you must destroy all
        materials obtained from the Site, including any and all copies of such
        materials whether made under this Terms or otherwise.
      </div>

      <div className={classes.title}>Non-Assignability</div>
      <div className={classes.desc}>
        You may not assign this Terms, by operation of law or otherwise, without
        our prior written consent. Subject to that restriction, this Terms will
        be binding upon, inure to the benefit of, and be enforceable against the
        parties and their respective successors and assigns
      </div>

      <div className={classes.title}>
        Entire Terms; Severability; Relationship
      </div>
      <div className={classes.desc}>
        These Terms constitute the entire Terms between you and Her PLAN. If any
        part of this Terms are determined to be invalid or unenforceable, then
        such invalid or unenforceable provision will be deemed superseded by a
        valid, enforceable provision that most closely matches the intent of the
        original provision and the allocation or risks, and the remainder of
        this Terms will continue in effect. If any provision(s) is found to be
        contrary to law, then such provision(s) will be construed, as nearly as
        possible, to reflect the intentions of the parties with the other
        provisions remaining in full force and effect. Any failure to exercise
        or delay in exercising any right, power or privilege under this Terms
        shall not operate as a waiver; nor shall any single or partial exercise
        of any right, power or privilege preclude any other or further exercise
        thereof. You agree that your Her PLAN account is non-transferable and
        all of your rights to your account terminate upon your death. No agency,
        partnership, joint venture, fiduciary or other special relationship or
        employment is created as a result of this Terms, and you may not make
        any representations on behalf of or bind Her PLAN.
      </div>

      <div className={classes.title}>Contact Us</div>
      <div className={classes.desc}>
        If you have any questions about this Terms, contact us at{" "}
        <a href="mailto:info@herplan.org" style={{ color: "#7dbaaf" }}>
          info@herplan.org
        </a>
      </div>
    </div>
  );
};

export default TermOfUse;
