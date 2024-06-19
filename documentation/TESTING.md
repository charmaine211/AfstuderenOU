# Testing

## Test React

We will be testing our React application using Jest and React Testing Library.

### Import Packages

Add the following dependencies with the latest version to `package.json`:

- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `react-test-renderer`

### Create Test File

1. Delete the standard test file `App.test.js`.

2. Under the `components` directory, create the following file, replacing `your_component` with the name of the component you want to test:

```
__test__/your_component.test.js
```

3. Add the following initial test setup:

```javascript
test("your_component", () => {
  expect(true).toBe(true);
});
```

4. Run to test setup:

```bash
npm run test
```

### Example Test File Structure

In `your_component.test.js`, add the following:

```javascript
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import YourComponent from "../your_component";

afterEach(() => {
  cleanup();
});

test("testcase_1", () => {
  render(<YourComponent />);
  const yourComponentElement = screen.getByTestId("your_test_id"); // Needs test id in component
  expect(yourComponentElement).toBeInTheDocument();
  expect(yourComponentElement).toHaveTextContent("expected text content"); // Replace with actual expected content
  expect(yourComponentElement).not.toHaveTextContent("unexpected text content"); // Replace with actual unexpected content
});

// Renderer test
test("testcase_2", () => {
  const tree = renderer.create(<YourComponent />).toJSON();
  expect(tree).toMatchSnapshot(); // Will create snapshot of tree automatically; update snapshot file when component changes
});
```

### Adding Data Test ID in Component

In `your_component.jsx`, add the `data-testid="your_test_id"` attribute to the element in the component that you want to test. For example:

```javascript
<div data-testid="your_test_id">Content to test</div>
```

For more detailed information on Jest, such as mocking HTTP calls and other advanced topics, refer to the [Jest documentation](https://jestjs.io/docs/mock-functions#mocking-modules).

## Test Python

## Test Flask

