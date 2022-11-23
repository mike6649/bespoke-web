import React, { Component, Fragment } from "react";
import './autocomplete.css'

type Props = { suggestions: string[], userInput: string, setUserInput: (userInput: string) => void }

export default class Autocomplete extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
    };
  }

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
  };

  onChange = (e: any) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion: string) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true
      // userInput: e.currentTarget.value
    });

    this.props.setUserInput(e.currentTarget.value);
  };

  onClick = (e: any) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false
      // userInput: e.currentTarget.innerText
    });
    this.props.setUserInput(e.currentTarget.innerText);
  };

  onKeyDown = (e: any) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false
      });
      this.props.setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
      }
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && this.props.userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={this.props.userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}
