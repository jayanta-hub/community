import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import Accordion from '../../../Infrastructure/component/Accordion/Accordion';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import styles from './styles';
const Support = () => {
  const TopNavigationBar = () => {
    return (
      <>
        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
                flex: 1,
              }}>
              Clicking on the menu button (3 small horizontal lines) to the
              top-left corner of the app reveals five options - Help & Support,
              Terms & Conditions, Change Password, Logout, and Delete Account.
              Use appropriately.
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
                marginBottom: scale(10),
                flex: 1,
              }}>
              <Text
                style={{
                  ...styles.aTypicalInterviewTextBold,
                  marginVertical: scale(10),
                }}>
                {` Note : `}
              </Text>
              Clicking
              <Text
                style={{
                  ...styles.aTypicalInterviewTextBold,
                  marginVertical: scale(10),
                }}>
                {` Delete Account `}
              </Text>
              will delete your account temporarily. You can re-activate your
              account within 30 days, after which it will be deactivated fully.
              You will not be able to access any data or petitions tied to this
              account on Imagility after this period.
            </Text>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
                marginBottom: scale(10),
                flex: 1,
              }}>
              You will then need to create a new account on Imagility.
            </Text>
          </View>
        </View>
      </>
    );
  };
  const UpdateProfileInformation = () => {
    return (
      <>
        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...styles.text,
                marginVertical: scale(5),
                flex: 1,
              }}>
              Click
              <Text
                style={{
                  ...styles.aTypicalInterviewTextBold,
                  marginVertical: scale(10),
                }}>
                {` My Account `}
              </Text>
              on the bottom navigation bar to edit your personal details or
              education, immigration, employment details.
            </Text>
          </View>
        </View>
      </>
    );
  };
  const CreatePost = () => {
    return (
      <>
        <View style={{...styles.container}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            Click on
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Create Post `}
            </Text>
            located at the center of the user profile area.
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
            }}>
            {'1.  '}
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
              flex: 1,
            }}>
            To create a post on petition decision, choose
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Petition Decision `}
            </Text>
            radio button, fill in details like visa type, decision (approved,
            denied, or RFE), reason, service center, and description, and click
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Post `}
            </Text>
            .
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
            }}>
            {'2.  '}
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
              flex: 1,
            }}>
            You can see the post you just created. Click
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Create New Post `}
            </Text>
            {`if needed.`}
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
            }}>
            {'3.  '}
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
              flex: 1,
            }}>
            If you feel like responding to an immigration rule, choose
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Respond to Immigration Rule `}
            </Text>
            radio button, choose the immigration rule from the dropdown list,
            enter your message or comments in the edit box and click
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Post `}.
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
            }}>
            {'4.  '}
          </Text>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
              flex: 1,
            }}>
            You can see the post you just created. Click
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Create New Post `}
            </Text>
            if needed.
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
            }}>
            {'5.  '}
          </Text>
          <Text
            style={{
              ...styles.text,
              marginVertical: scale(5),
              flex: 1,
            }}>
            Choose
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Enter your own story `}
            </Text>
            radio button to post your story, fill in details like title and
            description and click
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Post `}.
            </Text>
          </Text>
        </View>
      </>
    );
  };
  const MyPostsSection = () => {
    return (
      <>
        <View style={{...styles.container, marginTop: scale(10)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            Click on
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` My Posts link `}
            </Text>
            next to the
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Create Post `}
            </Text>
            button to see all your posts in one place.
          </Text>
        </View>
        <View style={{...styles.container, marginLeft: scale(20)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            {'\u2022'} If it is related to a decision, you will see it under the
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Decisions `}
            </Text>
            tab.
          </Text>
        </View>
        <View style={{...styles.container, marginLeft: scale(20)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            {'\u2022'} If it is in response to a rule, you will see it under the
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Responses to Rule `}
            </Text>
            tab.
          </Text>
        </View>
        <View style={{...styles.container, marginLeft: scale(20)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            {'\u2022'} If you have posted a story, it will appear under the
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Stories `}
            </Text>
            tab.
          </Text>
        </View>
      </>
    );
  };
  const PetitionDecisions = () => {
    return (
      <>
        <View style={{...styles.container, marginTop: scale(10)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            Click on
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Petition Decisions `}
            </Text>
            to see posts related to petition decisions that are posted by other
            community members. You can like, mark as favorite, or comment on any
            post as you do on Twitter or Facebook.
          </Text>
        </View>
      </>
    );
  };
  const ResponseToImmigrationRules = () => {
    return (
      <>
        <View style={{...styles.container, marginTop: scale(10)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            Click on
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Response to Immigration Rules `}
            </Text>
            and see all community user responses/posts on various immigration
            rules. You can like, mark as favorite, or comment on any post.
          </Text>
        </View>
      </>
    );
  };
  const Stories = () => {
    return (
      <>
        <View style={{...styles.container, marginTop: scale(10)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            Click on
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Stories `}
            </Text>
            and see stories shared by community users. You can like, mark as
            favorite, or comment on any of the posted stories.
          </Text>
        </View>
        <View style={{...styles.container}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Notes: `}
            </Text>
            Use the top right filter option of the page to filter on visa types,
            petition decisions etc,
          </Text>
        </View>
      </>
    );
  };
  const ViewRecentPosts = () => {
    return (
      <>
        <View style={{...styles.container, marginTop: scale(10)}}>
          <Text style={{...styles.text, marginBottom: scale(10)}}>
            Navigate through any of the three tabs -
            <Text
              style={{
                ...styles.aTypicalInterviewTextBold,
                marginVertical: scale(10),
              }}>
              {` Decision, Response to rule, Story `}
            </Text>
            - to view the most recent posts in each of these categories.
          </Text>
        </View>
      </>
    );
  };
  const BottomNavigationBar = () => {
    return (
      <>
        <View style={{...styles.container}}>
          <Text
            style={{
              ...styles.text,
              marginTop: scale(5),
            }}>
            The bottom navigation bar has three tabs - Home, Favorites, and My
            Account.
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
              }}>
              {'1.  '}
            </Text>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
                flex: 1,
              }}>
              <Text
                style={{
                  ...styles.aTypicalInterviewTextBold,
                  marginVertical: scale(10),
                }}>
                {`Home `}
              </Text>
              is the default option, and it displays all the main features
              available in this app.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
              }}>
              {'2.  '}
            </Text>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
                flex: 1,
              }}>
              Click on the
              <Text
                style={{
                  ...styles.aTypicalInterviewTextBold,
                  marginVertical: scale(10),
                }}>
                {` Favorites `}
              </Text>
              tab and see all your marked items in one place, whether it is
              related to decisions, response to rule, or stories.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
              }}>
              {'3.  '}
            </Text>
            <Text
              style={{
                ...styles.text,
                marginTop: scale(5),
                flex: 1,
                marginBottom: scale(10),
              }}>
              Click
              <Text
                style={{
                  ...styles.aTypicalInterviewTextBold,
                  marginVertical: scale(10),
                }}>
                {` My Account `}
              </Text>
              to view/edit /update profile information. This is covered under
              the “Update Profile Information” section above.
            </Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: scale(10),
          paddingHorizontal: scale(10),
        }}>
        <View style={{marginBottom: scale(10)}}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-Semibold',
            }}>
            Immigration Hub App
          </Text>
        </View>
        <View style={{marginTop: scale(14)}}>
          <Text style={styles.text}>
            Imagility’s immigration hub app helps beneficiaries and users share
            experiences like interviews and document verification of visa
            application journeys. They can look at the decisions of others and
            learn accordingly. Users can post their concerns or opinions on any
            rules and get vital help or ideas from the forum. This way, it helps
            users stay updated about what is going on in the US immigration
            space. The immigration hub app requires a few personal details to
            get started.
          </Text>
          <Text style={{...styles.text, marginTop: scale(10)}}>
            Once you register and log into the immigration hub app, you will see
            some main menu options. Here is a summary of each one.
          </Text>
        </View>
        <View style={styles.dashed} />
        <Accordion
          title={`Top Navigation Bar`}
          data={TopNavigationBar()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`Update Profile Information`}
          data={UpdateProfileInformation()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`Create Post`}
          data={CreatePost()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`My Posts Section`}
          data={MyPostsSection()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`Petition Decisions`}
          data={PetitionDecisions()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`Response to Immigration Rules`}
          data={ResponseToImmigrationRules()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`Stories`}
          data={Stories()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`View Recent Posts`}
          data={ViewRecentPosts()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <Accordion
          title={`Bottom Navigation Bar`}
          data={BottomNavigationBar()}
          backgroudColourInit={true}
          iconLeft={true}
          titlemargin={true}
          line={true}
          style={{
            body: {
              padding: scale(1),
            },
          }}
        />
        <View style={{marginTop: scale(19)}}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-Semibold',
            }}>
            Support :
          </Text>
          <View
            style={{
              ...styles.divider,
              borderWidth: scale(0.7),
              borderStyle: 'solid',
            }}
          />
        </View>
        <View style={{marginVertical: scale(10)}}>
          <Text
            style={{
              fontSize: scale(14),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-Regular',
              opacity: 0.7,
            }}>
            Email:
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:support@imagility.co')}>
            <Text
              style={{
                fontSize: scale(22),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-Semibold',
              }}>
              support@imagility.co
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Support;
