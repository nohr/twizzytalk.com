import { setUserProperties } from "firebase/analytics";
import React, { useCallback, useEffect, useRef } from "react";
import useSound from "use-sound";
import { analytics } from "../api/config";
import { x } from "./input";
import { dictionary } from "./dictionary";

function Convert({
  setConverted,
  converted,
  setValue,
  value,
  input,
}: {
  setConverted: React.Dispatch<React.SetStateAction<string>>;
  converted: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  input: React.RefObject<HTMLTextAreaElement>;
}) {
  const [bellSFX] = useSound(`/assets/copy.mp3`);
  const btn = useRef<HTMLButtonElement>(null!);

  // Handle special spelling cases
  const spell = useCallback((word: string) => {
    if (word === "Yeat") {
      return "Yeat";
    } else if (word === "Geek") {
      return "Geëk";
    } else if (dictionary[word.toLowerCase()]) {
      if (word.toLowerCase() === "twin") {
        return dictionary[word.toLowerCase()][Math.floor(Math.random() * 3)];
      } else {
        return dictionary[word.toLowerCase()];
      }
    } else if (
      word.toLowerCase() === `don't` ||
      word.toLowerCase() === `dont`
    ) {
      return "dnt";
    } else if (
      word.charAt(word.length - 3) === "i" &&
      word.charAt(word.length - 2) === "n" &&
      word.charAt(word.length - 1) === "g"
    ) {
      return word.replace(/ing/g, "in");
    } else if (word.toLowerCase().indexOf("ie") !== -1) {
      return word.replace(/ie/g, "ië");
    } else if (word.toLowerCase().indexOf("ee") !== -1) {
      return word.replace(/ee/g, "ëe");
    } else if (word.toLowerCase().indexOf("ea") !== -1) {
      return word.replace(/ea/g, "ëa");
    } else if (word.toLowerCase().indexOf("ck") !== -1) {
      return word.replace(/ck/g, "k");
    } else if (word.toLowerCase().indexOf("oo") !== -1) {
      return word.replace(/oo/g, "öo");
    } else {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === "e" && word[i] === word[i + 2]) {
          return word.split(word[i]).join("");
        }
      }
      if (
        word.charAt(word.length - 1) &&
        word.charAt(word.length - 1).toLowerCase() === "s"
      ) {
        if (
          word.charAt(word.length - 2) &&
          word.charAt(word.length - 2).toLowerCase() !== "s"
        ) {
          word = word.replaceAll(/(((?!.*is)(?!.*as)(?!.*us)\w+)s)/gim, `$2z`);
          word = replace(word);
        }
      }
      return replace(word);
    }
  }, []);

  // Function to parse initial string
  const decipher = useCallback(
    (string: any) => {
      let deciphered = string;
      deciphered = contract(deciphered);
      // Put each word in an array then spell each word
      deciphered = deciphered
        .split(" ")
        .map((word: string) => spell(word.replaceAll(/'/g, "").toLowerCase()));
      //  Check for sequential exceptions
      deciphered = sequence(deciphered).join(" ");
      if (x.matches) {
        setValue(deciphered);
      } else {
        setConverted(deciphered);
        // setValue('');
      }
      setUserProperties(analytics, {
        input: `${value}`,
        output: `${converted}`,
      });
    },
    [setConverted, setValue, spell]
  );

  //Key Commands
  useEffect(() => {
    function triggerDecipher(e: { preventDefault: () => void; key: string }) {
      e.preventDefault();
      if (e.key === "Enter") {
        value.length >= 0 && decipher(value.trim());
        input.current?.blur();
        bellSFX();
        btn.current.classList.add("buttonHover");
      }
      if (e.key === "Backspace" && value.length === 0) {
        decipher("");
      }
    }
    document.addEventListener("keyup", triggerDecipher);

    return () => {
      document.removeEventListener("keyup", triggerDecipher);
    };
  }, [input, value, decipher, bellSFX]);

  //Replace lettering
  function replace(word: string) {
    return word
      .replaceAll(/(([b-df-hj-np-tv-z])e)/gi, `$2ë`)
      .replaceAll(/([X])/gi, `X`)
      .replaceAll(/([Y])/gi, `Y`);
  }

  // Check for Contractions
  function contract(string: string) {
    return string
      .replaceAll(/already know?/gi, "ard know")
      .replaceAll(/on the|on da/gi, "onna");
  }

  // Check for sequence
  function sequence(array: string[]) {
    if (array[0]) {
      // There is at least a word so we start by adding hashes
      Math.floor(Math.random() * 2) === 0
        ? array.push("#")
        : array.unshift("#");
    }
    // Iterate through array
    for (let i = 0; i < array.length; i++) {
      if (array[2]) {
        // There is more than 1 word
        if (
          array[i + 1] &&
          array[i].toLowerCase() === array[i + 1].toLowerCase()
        ) {
          // Make first word lowercase
          array[0] = array[0].charAt(0).toLowerCase() + array[0].slice(1);
          // Capitalize repeat
          array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
          array[i + 1] =
            array[i + 1].charAt(0).toUpperCase() + array[i + 1].slice(1);
        } else if (
          array[i + 1] &&
          array[i].toLowerCase() !== array[i + 1].toLowerCase()
        ) {
          // Capitalize first word
          array[0] = array[0].charAt(0).toUpperCase() + array[0].slice(1);
        }
        if (
          !Number.isNaN(Number.parseInt(array[i])) &&
          array[i + 1] &&
          (array[i + 1].toLowerCase() === "you" ||
            array[i + 1].toLowerCase() === "u")
        ) {
          // Make you, U because an integer preceeds it
          array[i + 1] = "U";
        }
        if (
          array[i].toLowerCase() === "live" &&
          array[i + 1] &&
          array[i + 1].toLowerCase() === "high"
        ) {
          // Change high to hi because 'live' preceeds it
          array[i + 1] = array[i + 1].split(array[i + 1][2])[0];
        }
        if (array[0] && array[1] && array[2]) {
          //There are more than 3 words
          if (
            array[i].toLowerCase() === "tru" &&
            array[i + 2] &&
            (array[i + 2].toLowerCase() === "you" ||
              array[i + 2].toLowerCase() === "u")
          ) {
            array[i + 1] = "to";
          }
        }
      }
    }
    return array;
  }

  return (
    <div className="buttonLayout">
      <button
        aria-label="Convert Text"
        className="convertButton"
        ref={btn}
        onClick={() => {
          decipher(value);
          bellSFX();
        }}
      ></button>
      {value.length > 0 && (
        <button
          aria-label="Clear Text"
          className="clearButton md:hidden"
          onClick={() => setValue("")}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default Convert;
