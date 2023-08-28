import { useRef, useState } from 'react';
import './App.css';

const initialCharacters = [
  {
    name: 'Ange',
    image: './src/assets/',
    description:
      'Ange Ushiromiya, is the daughter of Rudolf Ushiromiya and Kyrie Ushiromiya, and the younger sister of Battler Ushiromiya.',
  },
  { name: 'Battler', image: './src/assets/' },
  { name: 'Beatrice', image: './src/assets/' },
  { name: 'Bernkastel', image: './src/assets/' },
  { name: 'Dlanor', image: './src/assets/' },
  { name: 'Erika', image: './src/assets/' },
  {
    name: 'Eva',
    image: './src/assets/',
    description:
      "Kinzo's second child. She is hostile towards her brother Krauss and opposes him whenever she can, from issues dealing with the family fortune to the question of who will succeed the family headship.",
  },
  { name: 'Featherine', image: './src/assets/' },
  { name: 'Gaap', image: './src/assets/' },
  { name: 'Genji', image: './src/assets/' },
  {
    name: 'George',
    image: './src/assets/',
    description:
      "Eva and Hideyoshi's son. An affable young man liked by everyone in the family. He is currently studying as an assistant for his father's company, and it seems he dreams of making it on his own one day.",
  },
  { name: 'Goat', image: './src/assets/' },
  { name: 'Hideyoshi', image: './src/assets/' },
  { name: 'Jessica', image: './src/assets/' },
  { name: 'Kanon', image: './src/assets/' },
  { name: 'Kinzo', image: './src/assets/' },
  { name: 'Krauss', image: './src/assets/' },
  { name: 'Kumasawa', image: './src/assets/' },
  { name: 'Kyrie', image: './src/assets/' },
  { name: 'Lambdadelta', image: './src/assets/' },
  { name: 'Lion', image: './src/assets/' },
  { name: 'Maria', image: './src/assets/' },
  { name: 'Natsuhi', image: './src/assets/' },
  { name: 'Ronove', image: './src/assets/' },
  { name: 'Rosa', image: './src/assets/' },
  { name: 'Rudolf', image: './src/assets/' },
  { name: 'Sakutarou', image: './src/assets/' },
  { name: 'Virgilia', image: './src/assets/' },
];

export default function App() {
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [currentCharObj, setCurrentCharObj] = useState(null);
  const charactersList = [...initialCharacters];

  function handleShowDescriptionForm() {
    setShowDescriptionForm(true);
  }

  function handleClose() {
    setShowDescriptionForm(false);
    setShowDescription(false);
  }

  function handleEditDescription(description) {
    charactersList.forEach((char) => {
      if (char.name === currentCharObj.name) {
        char.description = description;
      }
    });
    setShowDescriptionForm(false);
  }

  function handleSelectedChar(character) {
    setCurrentCharObj(character);
  }

  function handleShowDescription() {
    setShowDescription(true);
  }

  return (
    <div>
      <div className="main-content">
        <CharList
          characters={charactersList}
          onShowDescriptionForm={handleShowDescriptionForm}
          onSelectedChar={handleSelectedChar}
          onShowDescription={handleShowDescription}
        />
      </div>
      {showDescriptionForm && (
        <>
          <div className="translucent-background"></div>
          <div className="modal-container">
            <Form
              onEditDescription={handleEditDescription}
              onClose={handleClose}
              currentCharObj={currentCharObj}
            />
          </div>
        </>
      )}
      {showDescription && (
        <>
          <div className="translucent-background"></div>
          <div className="modal-container">
            <DescriptionModal
              currentCharObj={currentCharObj}
              onClose={handleClose}
            />
          </div>
        </>
      )}
    </div>
  );
}

function CharList({
  characters,
  onShowDescriptionForm,
  onSelectedChar,
  onShowDescription,
}) {
  return (
    <ul className="card">
      {characters.map((char) => (
        <Character
          char={char}
          key={char.name}
          onShowDescriptionForm={onShowDescriptionForm}
          onSelectedChar={onSelectedChar}
          onShowDescription={onShowDescription}
        />
      ))}
    </ul>
  );
}

function Character({
  char,
  onShowDescriptionForm,
  onSelectedChar,
  onShowDescription,
}) {
  return (
    <div className="card-container">
      <li
        onClick={() => {
          onSelectedChar(char);
          onShowDescription();
        }}
      >
        <p>{char.name}</p>
        <img src={`${char.image + char.name}.png`} alt={char.name}></img>
      </li>
      <Button
        style={char.description && 'green'}
        onClick={() => {
          onShowDescriptionForm();
          onSelectedChar(char);
        }}
      >
        {!char.description ? 'Add description' : 'Edit description'}
      </Button>
    </div>
  );
}

function Button({ children, onClick, style }) {
  return (
    <button className={'button ' + style} onClick={onClick}>
      {children}
    </button>
  );
}

function Form({ onClose, onEditDescription, currentCharObj }) {
  const textareaRef = useRef(null);
  const [description, setDescription] = useState(currentCharObj.description);

  const handleTextareaClick = () => {
    if (textareaRef.current) {
      textareaRef.current.style.cursor = 'text';
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    onEditDescription(description);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-container">
        <h2>Edit description:</h2>
        <button className="close-btn" type="button" onClick={onClose}>
          &times;
        </button>
      </div>
      <textarea
        id="edit-description-text"
        className="edit-description"
        ref={textareaRef}
        value={description}
        onClick={handleTextareaClick}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <div className="actions">
        <Button>Save</Button>
      </div>
    </form>
  );
}

function DescriptionModal({ onClose, currentCharObj }) {
  return (
    <div className="description-card">
      <div className="flex-container">
        <h2>{currentCharObj.name}</h2>
        <Button onClick={onClose}>Close</Button>
      </div>
      {currentCharObj.description ? (
        <p>{currentCharObj.description}</p>
      ) : (
        <p>There's no description for this character yet. You can add one.</p>
      )}
      <div className="description-card-image">
        <img src={`${currentCharObj.image}${currentCharObj.name}.png`}></img>
      </div>
    </div>
  );
}
