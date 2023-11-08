import {View, Text, ScrollView, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {Divider, RadioButton} from 'react-native-paper';
import {getAuthToken} from '../../../Infrastructure/utils/storageUtility';
import {
  getDecisionData,
  getReasonData,
  getRuleData,
  getServiceCenterData,
  getVisaData,
  PostCreatePost,
} from '../../../application/store/actions/timeLine';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';
const Filter = props => {
  const [status, setStatus] = useState(false);
  const [openVisaType, setOpenVisaType] = useState(false);
  const [visaType, setVisaType] = useState('');
  const [visaItems, setVisaItems] = useState([]);
  const [openImmigrationRule, setOpenImmigrationRule] = useState(false);
  const [ImmigrationRule, setImmigrationRule] = useState('');
  const [ruleItems, setRuleItems] = useState([]);
  const [openDecision, setOpenDecision] = useState(false);
  const [decision, setDecision] = useState('');
  const [decisionItems, setDecisionItems] = useState([]);
  const [openServiceCenter, setOpenServiceCenter] = useState(false);
  const [serviceCenter, setServiceCenter] = useState('');
  const [serviceCenterItems, setServiceCenterItems] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const {ContentType} = props.route.params;
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [errorMessageToShow, setErrorMessageToShow] = useState('');
  const navigation = useNavigation();
  const SubmitHandler = () => {
    navigation.navigate(
      props.route?.params?.isFav
        ? 'Favorite'
        : ContentType === 'DECISION'
        ? 'Decisions'
        : ContentType === 'RULERESPONSE'
        ? 'Responses to Rule'
        : 'Stories',
      {
        visaType: visaType,
        ImmigrationRule: ImmigrationRule,
        decision: decision,
        serviceCenter: serviceCenter,
        sortBy: sortBy,
        startDateInMilliSeconds: new Date(startdate).getTime(),
        endDateInMilliSeconds: new Date(
          startdate !== '' && enddate === '' ? startdate : enddate,
        ).getTime(),
        isFav: props.route.params.isFav ? props.route.params.isFav : false,
      },
    );
  };
  const init = async () => {
    const authToken = await getAuthToken();
    let Decision = props.getDecision(authToken).then(value => {
      value?.data && value?.data?.length
        ? setDecisionItems(
            value?.data?.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    let Visa = props.getVisa(authToken).then(value => {
      value?.data && value?.data?.length
        ? setVisaItems(
            value?.data?.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    let ServiceCenter = props.getServiceCenter(authToken).then(value => {
      value?.data && value?.data?.length
        ? setServiceCenterItems(
            value?.data?.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    let Rule = props.getRule(authToken).then(value => {
      value?.data && value?.data?.length
        ? setRuleItems(
            value?.data?.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    setStatus(true);
    Promise.allSettled([Decision, Visa, ServiceCenter, Rule])
      .then(() => {
        setStatus(false);
      })
      .catch(error => {
        setStatus(false);
        console.log('error init apicall =>>', error);
      });
  };
  useEffect(() => {
    ContentType !== 'STORY' ? init() : null;
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Loader status={status} />
      <View>
        {/* Petition Decision */}
        {ContentType === 'DECISION' ? (
          <>
            <View style={{zIndex: 150}}>
              <Text style={styles.Label}>Visa Type</Text>
              <DropDownPicker
                name="visaType"
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                open={openVisaType}
                value={visaType ? visaType : ''}
                items={visaItems}
                setOpen={setOpenVisaType}
                setItems={setVisaItems}
                setValue={setVisaType}
                placeholder="Select"
                searchable={true}
                searchContainerStyle={{
                  borderBottomColor: '#dfdfdf',
                }}
                searchTextInputStyle={{
                  color: '#4D4F5C',
                  borderColor: '#4D4F5C',
                }}
                placeholderStyle={{
                  color: '#4D4F5C',
                }}
                textStyle={{
                  color: '#4D4F5C',
                }}
                maxHeight={scale(250)}
                style={styles.dropdown}
              />
            </View>
            <View style={{marginTop: scale(20)}}>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </View>
            <View style={{zIndex: 140}}>
              <Text style={styles.Label}>Decision</Text>
              <DropDownPicker
                name="decision"
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                dropDownDirection={'BOTTOM'}
                open={openDecision}
                value={decision}
                items={decisionItems}
                setOpen={setOpenDecision}
                setItems={setDecisionItems}
                setValue={setDecision}
                placeholder="Select"
                placeholderStyle={{
                  color: '#4D4F5C',
                }}
                textStyle={{
                  color: '#4D4F5C',
                }}
                maxHeight={scale(115)}
                style={styles.dropdown}
              />
            </View>
            <View style={{marginTop: scale(20)}}>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </View>
            <View style={{zIndex: 120}}>
              <Text style={styles.Label}>Service Center</Text>
              <DropDownPicker
                name="serviceCenter"
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                dropDownDirection={'BOTTOM'}
                open={openServiceCenter}
                value={serviceCenter}
                items={serviceCenterItems}
                setOpen={setOpenServiceCenter}
                setItems={setServiceCenterItems}
                setValue={setServiceCenter}
                placeholder="Select"
                placeholderStyle={{
                  color: '#4D4F5C',
                }}
                textStyle={{
                  color: '#4D4F5C',
                }}
                maxHeight={scale(115)}
                style={styles.dropdown}
              />
            </View>
            <View style={{marginTop: scale(20)}}>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
            </View>
          </>
        ) : ContentType === 'RULERESPONSE' ? (
          <>
            {/* Respond to Immigration Rule */}
            <View style={{zIndex: 110}}>
              <Text style={styles.Label}>Immigration Rule</Text>
              <DropDownPicker
                name="ImmigrationRule"
                listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                dropDownDirection={'BOTTOM'}
                open={openImmigrationRule}
                value={ImmigrationRule}
                items={ruleItems}
                setOpen={setOpenImmigrationRule}
                setItems={setRuleItems}
                setValue={setImmigrationRule}
                placeholder="Select"
                placeholderStyle={{
                  color: '#4D4F5C',
                }}
                textStyle={{
                  color: '#4D4F5C',
                }}
                maxHeight={scale(115)}
                style={styles.dropdown}
              />
              <View style={{marginTop: scale(20)}}>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
              </View>
            </View>
          </>
        ) : null}
        <View style={{marginTop: scale(10)}}>
          <Text style={styles.title}>Sort By</Text>
          <View>
            <RadioButton.Group
              value={sortBy}
              onValueChange={value => setSortBy(value)}>
              <View style={{flexDirection: 'column', marginTop: scale(10)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="popularity"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="Popularity"
                  />
                  <Text style={styles.radioTitle}>Popularity</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="LATEST"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="Latest"
                  />
                  <Text style={styles.radioTitle}>Latest</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: scale(5),
                  }}>
                  <RadioButton.Android
                    value="THISWEEK"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="This Week"
                  />
                  <Text style={styles.radioTitle}>This Week</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: scale(5),
                  }}>
                  <RadioButton.Android
                    value="MONTH"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="This Month"
                  />
                  <Text style={styles.radioTitle}>This Month</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View style={{marginTop: scale(20)}}>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
          </View>
          <Text style={{...styles.title, marginTop: scale(10)}}>
            Date Range
          </Text>
          <View style={{flexDirection: 'row', flex: 1, marginTop: scale(5)}}>
            <View style={styles.monthCalendarView}>
              <CalendarPicker
                height={scale(400)}
                startFromMonday={true}
                weekdays={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']}
                todayBackgroundColor="#66BDFF"
                selectedDayColor="#128BFF"
                selectedDayTextColor="#FFFFFF"
                allowRangeSelection={true}
                allowBackwardRangeSelect={true}
                maxDate={new Date()}
                nextComponent={
                  <AntDesign name="right" size={scale(20)} color="#6D6363" />
                }
                previousComponent={
                  <AntDesign name="left" size={scale(20)} color="#6D6363" />
                }
                onDateChange={(date, Type) => {
                  Type === 'START_DATE' && date !== null
                    ? setStartdate(date._d)
                    : date !== null
                    ? setEnddate(date._d)
                    : setEnddate('');
                }}
                textStyle={{
                  ...styles.monthCalendarText,
                  fontSize: scale(12),
                  fontFamily: 'SourceSansPro-SemiBold',
                }}
                headerWrapperStyle={{
                  backgroundColor: '#EDF4FB',
                }}
                monthTitleStyle={styles.monthCalendarText}
                yearTitleStyle={styles.monthCalendarText}
              />
              {errorMessageToShow !== '' ? (
                <Text style={styles.errorMessage}>{errorMessageToShow}</Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              ...styles.submitButton,
              flex: 0.6,
              backgroundColor: '#B4BECA',
            }}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SubmitHandler}
            style={{
              ...styles.submitButton,
              flex: 1,
              marginLeft: scale(20),
              backgroundColor: '#10A0DA',
            }}>
            <Text style={styles.buttonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = ({
  timeLine: {DecisionData, VisaData, ServiceCenterData, RuleData},
}) => ({
  DecisionData,
  VisaData,
  ServiceCenterData,
  RuleData,
});
const mapDispatchToProps = {
  getDecision: (AuthToken, payload) => getDecisionData(AuthToken, payload),
  getVisa: (AuthToken, payload) => getVisaData(AuthToken, payload),
  getServiceCenter: (AuthToken, payload) =>
    getServiceCenterData(AuthToken, payload),
  getRule: (AuthToken, payload) => getRuleData(AuthToken, payload),
  createPost: (authToken, payload) => PostCreatePost(authToken, payload),
  getReason: authToken => getReasonData(authToken),
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
