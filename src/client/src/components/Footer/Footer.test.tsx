import { RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import buttonStyles from "../../css/button.module.css";
import { getInitialState, setSelectedRoute } from "../../mockData/mockStore";
import { AppState } from "../../store/combineReducers";
import { renderWithStore } from "../../testUtils";
import { ROUTE } from "../../utils/constants/constants";
import Footer from ".";
import styles from "./styles.module.css";

describe("Footer", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore();

  describe("When project name and page name is valid", () => {
    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
      props = {};
    });

    it("renders without crashing", () => {
      wrapper = renderWithStore(<Footer {...props} />, store);
      expect(wrapper).toBeDefined();
    });

    it("When page is new project next and create project buttons should be shown", () => {
      wrapper = renderWithStore(<Footer {...props} />, store);
      const nextButton = wrapper.getByText("Next");
      expect(nextButton).toBeDefined();
      expect(nextButton).toHaveClass(styles.buttonHighlighted);

      const createProjectButton = wrapper.getByText("Create Project");
      expect(createProjectButton).toBeDefined();
      expect(createProjectButton).toHaveClass(styles.buttonHighlighted);
    });

    it("When page is new project create project button should be shown", () => {
      wrapper = renderWithStore(<Footer {...props} />, store);
      const createProjectButton = wrapper.getByText("Create Project");
      expect(createProjectButton).toBeDefined();
      expect(createProjectButton).toHaveClass(styles.buttonHighlighted);
    });

    it("When page is SELECT_FRAMEWORKS next, back and create project button should be shown", () => {
      setSelectedRoute(initialState, ROUTE.SELECT_FRAMEWORKS);
      wrapper = renderWithStore(<Footer {...props} />, store);
      const nextButton = wrapper.getByText("Next");
      expect(nextButton).toBeDefined();
      expect(nextButton).toHaveClass(styles.buttonHighlighted);

      const backButton = wrapper.getByText("Back");
      expect(backButton).toBeDefined();

      const createProjectButton = wrapper.getByText("Create Project");
      expect(createProjectButton).toBeDefined();
      expect(createProjectButton).toHaveClass(styles.buttonHighlighted);
    });

    it("When page is SELECT_PAGES next, back and create project button should be shown", () => {
      setSelectedRoute(initialState, ROUTE.ADD_PAGES);
      wrapper = renderWithStore(<Footer {...props} />, store);
      const nextButton = wrapper.getByText("Next");
      expect(nextButton).toBeDefined();
      expect(nextButton).toHaveClass(styles.buttonHighlighted);

      const backButton = wrapper.getByText("Back");
      expect(backButton).toBeDefined();

      const createProjectButton = wrapper.getByText("Create Project");
      expect(createProjectButton).toBeDefined();
      expect(createProjectButton).toHaveClass(styles.buttonHighlighted);
    });

    it("When page is ADD_SERVICES next, back and create project button should be shown", () => {
      setSelectedRoute(initialState, ROUTE.ADD_SERVICES);
      wrapper = renderWithStore(<Footer {...props} />, store);
      const nextButton = wrapper.getByText("Next");
      expect(nextButton).toBeDefined();
      expect(nextButton).toHaveClass(styles.buttonHighlighted);

      const backButton = wrapper.getByText("Back");
      expect(backButton).toBeDefined();

      const createProjectButton = wrapper.getByText("Create Project");
      expect(createProjectButton).toBeDefined();
      expect(createProjectButton).toHaveClass(styles.buttonHighlighted);
    });

    it("When page is REVIEW_AND_GENERATE back and generate button should be shown", () => {
      setSelectedRoute(initialState, ROUTE.REVIEW_AND_GENERATE);
      wrapper = renderWithStore(<Footer {...props} />, store);

      const backButton = wrapper.getByText("Back");
      expect(backButton).toBeDefined();

      const createButton = wrapper.getByText("Create Project");
      expect(createButton).toBeDefined();
      expect(createButton).toHaveClass(buttonStyles.buttonHighlighted);
    });
  });

  describe("When project name is invalid", () => {
    beforeEach(() => {
      initialState = getInitialState();
      initialState.userSelection.projectNameObject.projectName = "";
      initialState.userSelection.projectNameObject.validation.isValid = false;
      store = mockStore(initialState);
    });

    it("renders without crashing", () => {
      wrapper = renderWithStore(<Footer />, store);
      expect(wrapper).toBeDefined();
    });

    it("back, next and generate button should be disabled", () => {
      wrapper = renderWithStore(<Footer />, store);

      const backButton = wrapper.getByText("Back");
      expect(backButton).toBeDisabled();

      const nextButton = wrapper.getByText("Next");
      expect(nextButton).toBeDisabled();

      const createButton = wrapper.getByText("Create Project");
      expect(createButton).toBeDisabled();
    });
  });

  describe("When some page name is invalid on select frameworks", () => {
    beforeEach(() => {
      initialState = getInitialState();
      initialState.userSelection.pages[0].isValidTitle = false;
      store = mockStore(initialState);
      setSelectedRoute(initialState, ROUTE.SELECT_FRAMEWORKS);
    });

    it("renders without crashing", () => {
      wrapper = renderWithStore(<Footer />, store);
      expect(wrapper).toBeDefined();
    });

    it("generate button should be disabled", () => {
      wrapper = renderWithStore(<Footer />, store);
      const createButton = wrapper.getByText("Create Project");
      expect(createButton).toBeDisabled();
    });
  });
});
