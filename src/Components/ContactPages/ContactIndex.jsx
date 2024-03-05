import React from "react";
import Header from "../Layout/Header";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import Footer from "../Layout/Footer";

class ContactIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        {
          id: 1,
          name: "Tommy Cash",
          phone: "445-667-123",
          email: "tom@gmail.com",
          isFavorite: true,
        },
        {
          id: 2,
          name: "Sophie Stonks",
          phone: "478-134-123",
          email: "sophie@gmail.com",
          isFavorite: false,
        },
        {
          id: 3,
          name: "Suzan Staf",
          phone: "992-883-774",
          email: "tom@gmail.com",
          isFavorite: true,
        },
      ],
    };
  }

  handleAddContact = (newContact) => {
    if (newContact.name == "") {
      return { status: "failure", msg: "Please enter a valid name" };
    }
    if (newContact.phone == "") {
      return { status: "failure", msg: "Please enter a valid phone number" };
    }

    const duplicateRecord = this.state.contactList.filter((u) => {
      if (u.name == newContact.name && u.phone == newContact.phone) {
        return true;
      }
    });

    if (duplicateRecord.length > 0) {
      return { status: "failure", msg: "Duplicate Record" };
    }


    const newFinalContact = {
      ...newContact,
      id: this.state.contactList.length > 0 ? this.state.contactList[this.state.contactList.length - 1].id + 1 : 0,
      isFavorite: false,
    };
    this.setState((previousState) => {
      return {
        contactList: previousState.contactList.concat([newFinalContact]),
      };
    });
    return { status: "success", msg: "Contact has been added successfully" };
  };

  handleToggleFavorites = (contact) => {
    this.setState((previousState) => {
      return {
        contactList: previousState.contactList.map((obj) => {
          if (obj.id == contact.id) {
            return { ...obj, isFavorite: !obj.isFavorite };
          }
          return obj;
        }),
      };
    });
  };

  handleToggleDeleteContact = (contact) => {
    this.setState((previousState) => {
      return {
        contactList: previousState.contactList.filter((u) => {
          if (u.id != contact.id) {
            return true;
          }
        }),
      };
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2">
              <AddRandomContact />
            </div>
            <div className="col-4">
              <RemoveAllContact />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <AddContact handleAddContact={this.handleAddContact} />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavoriteContacts
                  contacts={this.state.contactList.filter(
                    (u) => u.isFavorite == true
                  )}
                  favoriteClick={this.handleToggleFavorites}
                  deleteClick={this.handleToggleDeleteContact}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (u) => u.isFavorite == false
                  )}
                  favoriteClick={this.handleToggleFavorites}
                  deleteClick={this.handleToggleDeleteContact}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactIndex;
