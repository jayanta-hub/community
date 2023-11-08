import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {scale} from '../utils/screenUtility';
import {connect} from 'react-redux';
import Back from '../component/back/Back';
import {useNavigation} from '@react-navigation/native';
import CheckYourEligibility from '../../presentation/components/CheckYourEligibility/CheckYourEligibility';
import E2CNMIInvestor from '../../presentation/components/CheckYourEligibility/E-2 CNMI-Only Investor Eligibility/E2CNMIInvestor';
import AllIndividuals from '../../presentation/components/CheckYourEligibility/E-2 CNMI-Only Investor Eligibility/AllIndividuals';
import FileYourPetition from '../component/FileYourPetition/FileYourPetition';
import ForeignInvestor from '../../presentation/components/CheckYourEligibility/E-2 CNMI-Only Investor Eligibility/ForeignInvestor';
import ConnectWithImagility from '../component/ConnectWithImagility/ConnectWithImagility';
import RetireeInvestor from '../../presentation/components/CheckYourEligibility/E-2 CNMI-Only Investor Eligibility/RetireeeInvestor';
import E2TreatyInvestorVisa from '../../presentation/components/CheckYourEligibility/E-2 Treaty Investor Visa Eligibility/E2TreatyInvestorVisa';
import EB5VisaEligibility from '../../presentation/components/CheckYourEligibility/EB-5 Visa Eligibility/EB5VisaEligibility';
const HomeStack = createStackNavigator();

const CheckYourEligibilityNavigator = props => {
  const navigation = useNavigation();
  return (
    <>
      <HomeStack.Navigator initialRouteName="Check your Eligibility">
        <>
          <HomeStack.Screen
            name="Check your Eligibility"
            component={CheckYourEligibility}
            options={{
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="E-2 CNMI-Only Investor Eligibility"
            component={E2CNMIInvestor}
            options={{
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="All Individuals"
            component={AllIndividuals}
            options={{
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="File Your Petition"
            component={FileYourPetition}
            options={{
              title: 'Check your Eligibility',
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Connect with Imagility"
            component={ConnectWithImagility}
            options={{
              title: 'Check your Eligibility',
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="ForeignInvestor"
            component={ForeignInvestor}
            options={{
              title:
                'Individuals with a CNMI-issued foreign investor entry permit or long-term business entry permit',
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="RetireeInvestor"
            component={RetireeInvestor}
            options={{
              title: 'Individuals with a CNMI-issued retiree investor permit',
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="E2TreatyInvestorVisa"
            component={E2TreatyInvestorVisa}
            options={{
              title: 'E-2 Treaty Investor Visa Eligibility',
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="EB5VisaEligibility"
            component={EB5VisaEligibility}
            options={{
              title: 'EB-5 Visa Eligibility',
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerLeft: () => <Back />,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
        </>
      </HomeStack.Navigator>
    </>
  );
};

const mapStateToProps = ({
  notificationReducer: {notificationStatus},
  managetasksReducer: {taskDetails},
}) => ({
  notificationStatus,
  taskDetails,
});

export default connect(mapStateToProps, null)(CheckYourEligibilityNavigator);
