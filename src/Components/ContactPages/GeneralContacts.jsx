import Contact from "./Contact";

const GeneralContacts = (props) => {
  return (
    <div>
      {props.contacts.map((contactObj, index) => (
        <Contact contact={contactObj} key={index}></Contact>
      ))}
    </div>
  );
};

export default GeneralContacts;
