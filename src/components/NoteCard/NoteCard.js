import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import './NoteCard.css';

const NoteCard = () => {
  const notes = [
    {
      title: "Mimi Whitehouse",
      text: "Quite affectionate and outgoing.\
             She loves to get chin scratches and will\
             roll around on the floor waiting for you give her more of them."
    },
    {
      title: "Lorem Ipsum Nedir?",
      text: "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. \
             Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune \
             kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden \
             beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl \
             boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden \
             elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da \
             içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus \
             PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları \
             ile popüler olmuştur."
    }
  ];

  const [note, setNote] = useState(notes[Math.floor(Math.random() * notes.length)]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // const initialDisplay = false;
  const displayButtons = (enable) => {
    // if (enable){
    //   initialDisplay = true;
    // }
    setButtonsVisible(enable);
  }

  return (
    <div className="center center-ns measure-l measure-m ma0 ma5-ns mt2 mt2-ns pa0 pa4-ns" onMouseLeave={() => displayButtons(false)}>
      <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={250} animationOutDuration={250} isVisible={buttonsVisible}>
        <Animated animationIn="slideInUp" animationOut="slideOutDown" animationInDuration={400} animationOutDuration={400} isVisible={buttonsVisible}>
          <div className="tr tr-ns button-wrapper">
            <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button delete-note"></i>
            <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button next-note"></i>
            <i className="pointer contain f5 mh2-ns mh2 mv0-ns mv0 dib note-button add-note"></i>
          </div>
        </Animated>
      </Animated>
      <article className="measure-l measure-m mb0-ns mb0 mb3-ns mb3 bg-white br3 pa1 pa4-ns mv3 ba b--black-10"
        onMouseEnter={() => displayButtons(true)}>
        <div className="tc">
          <h1 className="f4">{note.title}</h1>
          <hr className="mw3 bb bw1 b--black-10"></hr>
        </div>
        <p className="lh-copy measure center f5 black-70">
          {note.text}
        </p>
      </article>
    </div>
  );
};

export default NoteCard;