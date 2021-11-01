import { render, screen } from "../utils";
import Events from "../../pages/Events";

// todo: fix connection warning here(related to axios rerouting to 127.0.0.1.80, unrelated to test)
describe("Events", () => {
    test("renders Events component", async () => {
        render(<Events />);

        const createEventButton = await screen.findByText(/Create an Event/i);

        expect(createEventButton).toBeInTheDocument();
    });
});
