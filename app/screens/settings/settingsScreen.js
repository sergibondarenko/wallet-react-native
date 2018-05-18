import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchProfile,
  fetchEmailAddresses,
  fetchMobileNumbers,
  fetchAddresses,
  fetchDocuments,
} from './../../redux/actions';
import Header from './../../components/header';
// import HeaderVerified from './../../../components/HeaderVerified';

import {
  OutputContainer,
  Output,
  InputContainer,
} from './../../components/common';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  goTo = (path, name) => {
    this.props.navigation.navigate(path, { name });
  };

  renderBasicInfo() {
    const { profile } = this.props;

    let value = profile.first_name + ' ' + profile.last_name;

    return (
      <Output
        label="Basic info"
        value={value}
        gotoAddress="SettingsPersonalDetails"
        goTo={this.goTo}
      />
    );
  }

  renderEmailAddresses() {
    const { emailAddresses } = this.props;

    let value = 'Not yet provided';

    for (let i = 0; i < emailAddresses.length; i++) {
      if (emailAddresses[i].verified === true) {
        value = emailAddresses[i].email;
      }
      if (emailAddresses[i].primary === true) {
        value = emailAddresses[i].email;
        break;
      }
    }

    return (
      <Output
        label="Email address"
        value={value}
        gotoAddress="SettingsEmailAddresses"
        goTo={this.goTo}
      />
    );
  }

  renderMobileNumbers() {
    const { mobileNumbers } = this.props;

    let value = 'Not yet provided';

    for (let i = 0; i < mobileNumbers.length; i++) {
      if (mobileNumbers[i].verified) {
        value = mobileNumbers[i].number;
      }
      if (mobileNumbers[i].primary) {
        value = mobileNumbers[i].number;
        break;
      }
    }

    return (
      <Output
        label="Mobile number"
        value={value}
        gotoAddress="SettingsMobileNumbers"
        goTo={this.goTo}
      />
    );
  }

  renderAddresses() {
    const { addresses } = this.props;

    let value = '';
    if (addresses.line_1) {
      value = value + addresses.line_1 + ', ';
    }
    if (addresses.line_2) {
      value = value + addresses.line_2 + ', ';
    }
    if (addresses.city) {
      value = value + addresses.city + ', ';
    }
    if (addresses.state_province) {
      value = value + addresses.state_province + ', ';
    }
    if (addresses.country) {
      value = value + addresses.country + ', ';
    }
    if (addresses.postal_code) {
      value = value + addresses.postal_code;
    }

    return (
      <Output
        label="Address"
        value={value}
        gotoAddress="SettingsAddress"
        goTo={this.goTo}
      />
    );
  }

  renderDocuments() {
    return (
      <View>
        <Output
          label="Proof of identity"
          gotoAddress="Document"
          goTo={this.goTo}
        />

        <Output
          label="Advanced proof of identity"
          gotoAddress="Document"
          goTo={this.goTo}
        />

        <Output
          label="Proof of address"
          gotoAddress="Document"
          goTo={this.goTo}
        />
      </View>
    );
  }

  renderBankAccounts() {
    return (
      <Output
        label="Bank accounts"
        gotoAddress="SettingsBankAccounts"
        goTo={this.goTo}
      />
    );
  }

  renderCards() {
    return (
      <Output label="Cards" gotoAddress="SettingsCards" goTo={this.goTo} />
    );
  }

  renderCryptoAccounts() {
    return (
      <Output
        label="Crypto accounts"
        gotoAddress="SettingsCryptoAddresses"
        goTo={this.goTo}
      />
    );
  }

  renderSecurity() {
    return (
      <View>
        <Output
          label="Reset password"
          gotoAddress="ChangePassword"
          goTo={this.goTo}
        />
        <Output label="Two factor" gotoAddress="TwoFactor" goTo={this.goTo} />
        {/* <Output label="Pin" gotoAddress="Pin" goTo={this.goTo} /> */}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Settings" />
        {/* <HeaderVerified
          photoLink={profile.profile}
          username={profile.username}
          firstName={profile.first_name}
          lastName={profile.last_name}
        /> */}
        <InputContainer>
          <OutputContainer label="Personal details">
            {this.renderBasicInfo()}
            {this.renderEmailAddresses()}
            {this.renderMobileNumbers()}
            {this.renderAddresses()}
          </OutputContainer>
          {/* <OutputContainer label="Identity">
            {this.renderDocuments()}
          </OutputContainer> */}
          <OutputContainer label="External accounts">
            {this.renderBankAccounts()}
            {/* {this.renderCards()} */}
            {this.renderCryptoAccounts()}
          </OutputContainer>
          <OutputContainer label="Security">
            {this.renderSecurity()}
          </OutputContainer>
        </InputContainer>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // mainContainer: {
  //   flex: 1,
  // },
};

const mapStateToProps = ({ user }) => {
  const { profile, addresses, mobileNumbers, emailAddresses, documents } = user;
  return {
    profile,
    addresses,
    mobileNumbers,
    emailAddresses,
    documents,
  };
};

export default connect(mapStateToProps, {
  fetchProfile,
  fetchEmailAddresses,
  fetchMobileNumbers,
  fetchAddresses,
  fetchDocuments,
})(SettingsScreen);
