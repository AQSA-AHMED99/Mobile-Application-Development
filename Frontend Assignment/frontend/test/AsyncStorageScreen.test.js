import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageScreen from "../screens/AsyncStorageScreen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve("John Doe")),
}));

describe("AsyncStorageScreen", () => {
  it("saves and retrieves name correctly", async () => {
    const { getByPlaceholderText, getByText } = render(<AsyncStorageScreen />);

    const input = getByPlaceholderText("Enter your name");
    fireEvent.changeText(input, "John Doe");

    const saveButton = getByText("Save Name");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("userName", "John Doe");
    });

    const getButton = getByText("Get Name");
    fireEvent.press(getButton);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("userName");
    });
  });
});
