import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import DetailsScreen from "../screens/DetailsScreen";
import { CartProvider } from "../context/CartContext";

jest.spyOn(Alert, "alert"); // mock alerts

const mockItem = {
  id: "1",
  name: "Cheese Pizza",
  price: "Rs.2500",
  image: require("../../assets/cheesepza.jpg"),
};

describe("DetailsScreen", () => {
  it("renders item details correctly", () => {
    const { getByText } = render(
      <CartProvider>
        <DetailsScreen route={{ params: { item: mockItem } }} />
      </CartProvider>
    );

    expect(getByText("Cheese Pizza")).toBeTruthy();
    expect(getByText("Rs.2500")).toBeTruthy();
  });

  it("adds item to cart and shows success alert", async () => {
    const { getByText } = render(
      <CartProvider>
        <DetailsScreen route={{ params: { item: mockItem } }} />
      </CartProvider>
    );

    const addButton = getByText("Add to Cart");
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success ✅",
        expect.stringMatching(/Cheese Pizza added successfully/i)
      );
    });
  });
});
