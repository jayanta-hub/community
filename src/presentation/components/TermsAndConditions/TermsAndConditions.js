import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import Accordion from '../../../Infrastructure/component/Accordion/Accordion';
const TermsAndConditions = () => {
  const Definitions = () => {
    return (
      <>
        <View>
          <Text style={styles.text}>
            "Documentation" means the user manuals, specifications, handbooks,
            guides, and other materials and objectives relating to and depicting
            the functions of the Platform which are provided by Company to you,
            either electronically or in hard copy foOR OLDER; AND (C) ACCEPT
            THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY BOUND BY ITS TERMS. IF
            YOU DOrm, including (a) the list of Third-Party Components that are
            now or in the future will be incorporated in or integrated with the
            Platform and your access rights thereto and (b) the planned
            development of releases, features, and technologies associated with
            the Platform. Company will provide you with a copy of the
            Documentation promptly upon your request or, absent any request,
            upon any material updates to the Documentation by Company.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            "Intellectual Property Rights" means any and all registered and
            unregistered rights granted, applied for, or otherwise now or
            hereafter in existence under or related to any patent, copyright,
            trademark, trade secret, database protection, or other intellectual
            property rights laws, and all similar or equivalent rights or forms
            of protection, in any part of the world.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            "Platform" means the Imagility platform.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            "Premium Services" has the meaning set forth in Section 8.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            "Third-Party Components" has the meaning set forth in Section 7.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            "Update" has the meaning set forth in Section 6.
          </Text>
        </View>
      </>
    );
  };
  const LicenseGrant = () => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              a.
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            download, install, and use the Platform for your personal,
            non-commercial use, or, if you are an individual user affiliated
            with or employed by a Petitioner or law firm, for the internal
            business purposes of the Petitioner or law firm, on a single device
            owned or otherwise controlled by you ("Device") strictly in
            accordance with the Platform's documentation; and
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(10),
              }}>
              b.
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
              marginTop: scale(10),
            }}>
            Link your individual account to (i) one or more Petitioners or (ii)
            to an Attorney either (a) through a Petitioner or (b) directly from
            your individual account for visastamping-based immigration services.
          </Text>
        </View>
      </>
    );
  };
  const LicenseRestrictions = () => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              a)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            copy the Platform, except as expressly permitted by this license;
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              b)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            modify, translate, adapt, or otherwise create derivative works or
            improvements, whether or not patentable, of the Platform;
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              c)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            reverse engineer, disassemble, decompile, decode, or otherwise
            attempt to derive or gain access to the source code of the Platform
            or any part thereof;
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              d)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            remove, delete, alter, or obscure any trademarks or any copyright,
            trademark, patent, or other intellectual property or proprietary
            rights notices from the Platform, including any copy thereof;
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              e)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            rent, lease, lend, sell, sublicense, assign, distribute, publish,
            transfer, or otherwise make available the Platform, or any features
            or functionality of the Platform, to any third party for any reason,
            including by making the Platform available on a network where it is
            capable of being accessed by more than one device at any time; or
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              f)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            remove, disable, circumvent, or otherwise create or implement any
            workaround to any copy protection, rights management, or security
            features in or protecting the Platform.
          </Text>
        </View>
      </>
    );
  };
  const ReservationofRights = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            Reservation of Rights. You acknowledge and agree that the Platform
            is provided under license, and not sold, to you. You do not acquire
            any ownership interest in the Platform under this Agreement, or any
            other rights thereto other than to use the Platform in accordance
            with the license granted, and subject to all terms, conditions, and
            restrictions, under this Agreement. Company and its licensors and
            service providers reserve and shall retain their entire right,
            title, and interest in and to the Platform, including all
            copyrights, trademarks, and other intellectual property rights
            therein or relating thereto, except as expressly granted to you in
            this Agreement.
          </Text>
        </View>
      </>
    );
  };
  const Collection = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            You acknowledge that when you download, install, or use the
            Platform, Company may use automatic means (including, for example,
            cookies and web beacons) to collect information about your Device
            and about your use of the Platform. You also may be required to
            provide certain information about yourself as a condition to
            downloading, installing, or using the Platform or certain of its
            features or functionality, and the Platform may provide you with
            opportunities to share information about yourself with others. All
            information we collect through or in connection with this Platform
            is subject to our Privacy Policy [INSERT AS LINK TO PRIVACY POLICY].
            By downloading, installing, using, and providing information to or
            through this Platform, you consent to all actions taken by us with
            respect to your information in compliance with the Privacy Policy.
          </Text>
        </View>
      </>
    );
  };
  const Platformupdates = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            Updates. Company may from time to time in its sole discretion
            develop and provide Platform updates, which may include upgrades,
            bug fixes, patches, other error corrections, and/or new features
            (collectively, including related documentation, "Updates"). Updates
            may also modify or delete in their entirety certain features and
            functionality. You agree that Company has no obligation to provide
            any Updates or to continue to provide or enable any particular
            features or functionality. Based on your Device settings, when your
            Device is connected to the internet either:
          </Text>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <View>
              <Text
                style={{
                  ...styles.text,
                }}>
                a)
              </Text>
            </View>
            <Text
              style={{
                ...styles.text,
                marginLeft: scale(10),
              }}>
              The Platform will automatically download and install all available
              Updates; or
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <View>
              <Text
                style={{
                  ...styles.text,
                }}>
                b)
              </Text>
            </View>
            <Text
              style={{
                ...styles.text,
                marginLeft: scale(10),
              }}>
              You may receive notice of or be prompted to download and install
              available Updates.
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            You shall promptly download and install all Updates and acknowledge
            and agree that the Platform or portions thereof may not properly
            operate should you fail to do so. You further agree that all Updates
            will be deemed part of the Platform and be subject to all terms and
            conditions of this Agreement.
          </Text>
        </View>
      </>
    );
  };
  const ThirdParty = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            The Platform may display, include, or make available third-party
            content (including data, information, applications, and other
            products, services, and/or materials) or provide links to
            third-party websites or services, including through third-party
            advertising ("Third-Party Components"). You acknowledge and agree
            that Company is not responsible for Third-Party Components,
            including their accuracy, completeness, timeliness, validity,
            copyright compliance, legality, decency, quality, or any other
            aspect thereof. Company does not assume and will not have any
            liability or responsibility to you or any other person or entity for
            any Third-Party Components. Third-Party Components and links thereto
            are provided solely as a convenience to you, and you access and use
            them entirely at your own risk and subject to such third parties'
            terms and conditions.
          </Text>
        </View>
      </>
    );
  };
  const PremiumServices = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            Company may make available to you certain services, including
            services for undocumented immigrants, immigrants seeking asylum,
            green card holders seeking citizenship, and other premium services
            ("Premium Services") in connection with your use of the Platform.
            Premium Services will be made available to you in accordance with
            the terms and prices, if any, set forth by Company.
          </Text>
        </View>
      </>
    );
  };
  const Termination = () => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              a)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            The term of Agreement commences when you acknowledge your acceptance
            and will continue in effect until terminated by you or Company as
            set forth in this Section 9.
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              b)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            You may terminate this Agreement by deleting the Platform and all
            copies thereof from your Device.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              c)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            Company may terminate this Agreement at any time without notice. In
            addition, this Agreement will terminate immediately and
            automatically without any notice if you violate any of the terms and
            conditions of this Agreement.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              d)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            Upon termination:
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: scale(20)}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              (i)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            all rights granted to you under this Agreement will also terminate;
            and
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: scale(20)}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              (ii)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            you must cease all use of the Platform and delete all copies of the
            Platform from your Device and account.
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                ...styles.text,
              }}>
              e)
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              marginLeft: scale(10),
            }}>
            Termination will not limit any of Company's rights or remedies at
            law or in equity.
          </Text>
        </View>
      </>
    );
  };
  const IntellectualRights = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            You acknowledge and agree that the Platform and Documentation are
            provided under license, and not sold, to you. You do not acquire any
            ownership interest in the Platform or Documentation under this
            Agreement, or any other rights thereto, other than to use the same
            in accordance with the license granted and subject to all terms,
            conditions, and restrictions under this Agreement. Company reserves
            and shall retain its entire right, title, and interest in and to the
            Platform and all Intellectual Property Rights arising out of or
            relating to the Platform, except as expressly granted to you in this
            Agreement. You shall use commercially reasonable efforts to
            safeguard all Platform (including all copies thereof) from
            infringement, misappropriation, theft, misuse, or unauthorized
            access. You shall promptly notify Company if you become aware of any
            infringement of the Company’s Intellectual Property Rights in the
            Platform and fully cooperate with Company in any legal action taken
            by Company to enforce its Intellectual Property Rights.
          </Text>
        </View>
      </>
    );
  };
  const Maintenance = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            Maintenance and Support. This Agreement does not entitle you to any
            support for the Platform other than that which Company makes
            generally available to other customers of the Platform at no
            additional charge. Company has no obligation to provide maintenance
            and support services, including Updates, (i) for any but the most
            current version or release of the Platform; (ii) for any copy of
            Platform for which all previously issued Updates have not been
            installed; (iii) if you are in breach under this Agreement; or (iv)
            for any Platform that has been modified other than by or with the
            authorization of Licensor, or that is being used with any hardware,
            software, configuration, or operating system not specified in the
            Documentation or expressly authorized by Company in writing.
          </Text>
        </View>
      </>
    );
  };
  const Disclaimer = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            THE PLATFORM IS PROVIDED TO END USER "AS IS" AND WITH ALL FAULTS AND
            DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT
            PERMITTED UNDER APPLICABLE LAW, COMPANY, ON ITS OWN BEHALF AND ON
            BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND
            SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER
            EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH RESPECT TO THE
            PLATFORM, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND
            WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF
            PERFORMANCE, USAGE, OR TRADE PRACTICE. WITHOUT LIMITATION TO THE
            FOREGOING, COMPANY PROVIDES NO WARRANTY OR UNDERTAKING, AND MAKES NO
            REPRESENTATION OF ANY KIND THAT THE PLATFORM WILL MEET YOUR
            REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE COMPATIBLE, OR WORK
            WITH ANY OTHER SOFTWARE, APPLICATIONS, SYSTEMS, OR SERVICES, OPERATE
            WITHOUT INTERRUPTION, MEET ANY PERFORMANCE OR RELIABILITY STANDARDS,
            OR BE ERROR-FREE, OR THAT ANY ERRORS OR DEFECTS CAN OR WILL BE
            CORRECTED.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR LIMITATIONS ON
            IMPLIED WARRANTIES OR THE LIMITATIONS ON THE APPLICABLE STATUTORY
            RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND
            LIMITATIONS MAY NOT APPLY TO YOU.
          </Text>
        </View>
      </>
    );
  };
  const Limitation = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL
            COMPANY OR ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE
            LICENSORS OR SERVICE PROVIDERS, HAVE ANY LIABILITY ARISING FROM OR
            RELATED TO YOUR USE OF OR INABILITY TO USE THE PLATFORM OR THE
            CONTENT AND SERVICES FOR:
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  ...styles.text,
                }}>
                a)
              </Text>
            </View>
            <Text
              style={{
                ...styles.text,
                marginLeft: scale(10),
              }}>
              PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF SUBSTITUTE
              GOODS OR SERVICES, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS
              INTERRUPTION, COMPUTER FAILURE OR MALFUNCTION, OR ANY OTHER
              CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR
              PUNITIVE DAMAGES.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  ...styles.text,
                }}>
                b)
              </Text>
            </View>
            <Text
              style={{
                ...styles.text,
                marginLeft: scale(10),
              }}>
              DIRECT DAMAGES IN AMOUNTS THAT IN THE AGGREGATE EXCEED THE AMOUNT
              ACTUALLY PAID BY YOU FOR THE PLATFORM.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  ...styles.text,
                  marginLeft: scale(23),
                }}>
                a.
              </Text>
            </View>
            <Text
              style={{
                ...styles.text,
                marginLeft: scale(10),
              }}>
              THE FOREGOING LIMITATIONS WILL APPLY WHETHER SUCH DAMAGES ARISE
              OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
              OTHERWISE AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE
              OR COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME
              JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF LIABILITY SO
              SOME OR ALL OF THE ABOVE LIMITATIONS OF LIABILITY MAY NOT APPLY TO
              YOU.
            </Text>
          </View>
        </View>
      </>
    );
  };
  const Indemnification = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            You agree to indemnify, defend, and hold harmless Company and its
            officers, directors, employees, agents, affiliates, successors, and
            assigns from and against any and all losses, damages, liabilities,
            deficiencies, claims, actions, judgments, settlements, interest,
            awards, penalties, fines, costs, or expenses of whatever kind,
            including reasonable attorneys' fees, arising from or relating to
            your use or misuse of the Platform or your breach of this Agreement,
            including but not limited to the content you submit or make
            available through this Platform.
          </Text>
        </View>
      </>
    );
  };
  const ExportRegulation = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            The Application may be subject to US export control laws, including
            the Export Control Reform Act and its associated regulations. You
            shall not, directly or indirectly, export, re-export, or release the
            Platform to, or make the Platform accessible from, any jurisdiction
            or country to which export, re-export, or release is prohibited by
            law, rule, or regulation. You shall comply with all applicable
            federal laws, regulations, and rules, and complete all required
            undertakings (including obtaining any necessary export license or
            other governmental approval), prior to exporting, re-exporting,
            releasing, or otherwise making the Platform available outside the
            US.
          </Text>
        </View>
      </>
    );
  };
  const USGovernmentRights = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            The Application is commercial computer software, as such term is
            defined in 48 C.F.R. §2.101. Accordingly, if you are an agency of
            the US Government or any contractor therefor, you receive only those
            rights with respect to the Application as are granted to all other
            end users under license, in accordance with (a) 48 C.F.R. §227.7201
            through 48 C.F.R. §227.7204, with respect to the Department of
            Defense and their contractors, or (b) 48 C.F.R. §12.212, with
            respect to all other US Government licensees and their contractors.
          </Text>
        </View>
      </>
    );
  };
  const ForMajeure = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            Company will not be responsible or liable to you, or deemed in
            default or breach hereunder by reason of any failure or delay in the
            performance of its obligations hereunder where such failure or delay
            is due to strikes, labor disputes, civil disturbances, riot,
            rebellion, invasion, epidemic, hostilities, war, terrorist attack,
            embargo, natural disaster, acts of God, flood, fire, sabotage,
            fluctuations or non-availability of electrical power, heat, light,
            air conditioning, or your equipment, loss and destruction of
            property, or any other circumstances or causes beyond Company’s
            reasonable control.
          </Text>
        </View>
      </>
    );
  };
  const Severability = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            If any provision of this Agreement is illegal or unenforceable under
            applicable law, the remainder of the provision will be amended to
            achieve as closely as possible the effect of the original term and
            all other provisions of this Agreement will continue in full force
            and effect.
          </Text>
        </View>
      </>
    );
  };
  const GoverningLaw = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            This Agreement is governed by and construed in accordance with the
            internal laws of the Commonwealth of Pennsylvania without giving
            effect to any choice or conflict of law provision or rule. Any legal
            suit, action, or proceeding arising out of or related to this
            Agreement or the Platform shall be instituted exclusively in the
            federal courts of the United States or the courts of the
            Commonwealth of Pennsylvania in each case located in Philadelphia.
            You waive any and all objections to the exercise of jurisdiction
            over you by such courts and to venue in such courts.
          </Text>
        </View>
      </>
    );
  };
  const EntireAgreement = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            This Agreement and our Privacy Policy constitute the entire
            agreement between you and Company with respect to the Platform and
            supersede all prior or contemporaneous understandings and
            agreements, whether written or oral, with respect to the Platform.
          </Text>
        </View>
      </>
    );
  };
  const Assignment = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            You may not assign any of your rights or delegate any of your
            obligations hereunder, in each case whether voluntarily,
            involuntarily, by operation of law or otherwise, without the prior
            written consent of Company. Any purported assignment or delegation
            in violation of this Section will be null and void. No assignment or
            delegation will relieve the assigning or delegating Party of any of
            its obligations hereunder. This Agreement is binding upon and inures
            to the benefit of the Parties and their respective permitted
            successors and assigns.
          </Text>
        </View>
      </>
    );
  };
  const Waiver = () => {
    return (
      <>
        <View>
          <Text
            style={{
              ...styles.text,
            }}>
            No failure to exercise, and no delay in exercising, on the part of
            either party, any right or any power hereunder shall operate as a
            waiver thereof, nor shall any single or partial exercise of any
            right or power hereunder preclude further exercise of that or any
            other right hereunder. In the event of a conflict between this
            Agreement and any applicable purchase or other terms, the terms of
            this Agreement shall govern.
          </Text>
        </View>
      </>
    );
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#ffff'}}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text
            style={{
              ...styles.text,
            }}>
            Beneficiary must read and accept Terms & conditions to register with
            Imagility.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            Imagility Platform End User License Agreement
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
            }}>
            This Imagility Platform End User License Agreement ("Agreement") is
            a binding agreement between you ("End User" or "you") and Imagility
            LLC ("Company"). This Agreement governs your use of the Imagility
            Platform, (including all related documentation, the "Platform"). The
            Platform is licensed, not sold, to you.
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(10),
              marginBottom: scale(15),
            }}>
            BY [CLICKING THE "AGREE" BUTTON/[[DOWNLOADING/INSTALLING/USING] THE
            APPLICATION]], YOU (A) ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND
            THIS AGREEMENT; (B) REPRESENT THAT YOU ARE 18 YEARS OF AGE NOT AGREE
            TO THESE TERMS, DO NOT DOWNLOAD, INSTALL, OR USE THE PLATFORM.
          </Text>
        </View>

        <View style={{marginHorizontal: scale(-10)}}>
          <View
            style={{
              borderWidth: scale(0.9),
              borderStyle: 'dashed',
              borderColor: '#C3D0DE',
            }}
          />
          <Accordion
            title={`Definitions. For purposes of this Agreement, the following terms have the following meanings:`}
            data={Definitions()}
            backgroudColourInit={true}
            iconLeft={true}
            line={true}
            titlemargin={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`License Grant. Subject to the terms of this Agreement, Company grants you a limited, non-exclusive, and non transferable license to:`}
            data={LicenseGrant()}
            backgroudColourInit={true}
            iconLeft={true}
            line={true}
            titlemargin={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`License Restrictions. You shall not:`}
            data={LicenseRestrictions()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Reservation of Rights`}
            data={ReservationofRights()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Collection and Use of Your Information.`}
            data={Collection()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Platform updates`}
            data={Platformupdates()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Third-Party Components`}
            data={ThirdParty()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Premium Services`}
            data={PremiumServices()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Term and Termination`}
            data={Termination()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Intellectual Property Rights`}
            data={IntellectualRights()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Maintenance and Support`}
            data={Maintenance()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Disclaimer of Warranties`}
            data={Disclaimer()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Limitation of Liability`}
            data={Limitation()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Indemnification`}
            data={Indemnification()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Export Regulation`}
            data={ExportRegulation()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`US Government Rights`}
            data={USGovernmentRights()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`For Majeure`}
            data={ForMajeure()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Severability`}
            data={Severability()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Governing Law`}
            data={GoverningLaw()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Entire Agreement`}
            data={EntireAgreement()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Assignment`}
            data={Assignment()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
          <Accordion
            title={`Waiver`}
            data={Waiver()}
            backgroudColourInit={true}
            iconLeft={true}
            titlemargin={true}
            line={true}
            style={{
              body: {
                padding: scale(10),
              },
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default TermsAndConditions;
