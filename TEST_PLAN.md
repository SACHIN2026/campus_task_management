# Test Plan - Campus Assessment Task Management

## Positive Test Cases

### Authentication Tests
1. **Valid Login**
   - Input: username="demo", password="password123"
   - Expected: Successful login, redirect to dashboard
   - Verification: User shown in navigation, tasks load

2. **Demo Login Button**
   - Action: Click "Use Demo Account" button
   - Expected: Form pre-fills with demo credentials
   - Verification: Username and password fields populated

### Task Creation Tests
3. **Create Valid Task**
   - Input: title="Test Task", description="Test description", status=TODO, priority=MEDIUM
   - Expected: Task created successfully, appears in task list
   - Verification: Task visible with correct data

4. **Create Task with All Fields**
   - Input: All fields filled, both checkboxes checked
   - Expected: Task created with all properties set correctly
   - Verification: Task shows URGENT and COMPLETED badges

### Task Management Tests
5. **Edit Existing Task**
   - Action: Click edit button, modify title and status
   - Expected: Task updated with new values
   - Verification: Changes reflected in task list

6. **Delete Task**
   - Action: Click delete, confirm in dialog
   - Expected: Task removed from list
   - Verification: Task no longer visible

### Filtering Tests
7. **Filter by Status**
   - Action: Select "In Progress" from status filter
   - Expected: Only in-progress tasks shown
   - Verification: Task count updates, only matching tasks visible

8. **Filter by Priority**
   - Action: Select "High" from priority filter
   - Expected: Only high-priority tasks shown
   - Verification: Only tasks with high priority visible

9. **Search Functionality**
   - Input: Search term in title/description
   - Expected: Only matching tasks shown
   - Verification: Results contain search term

### Pagination Tests
10. **Page Navigation**
    - Action: Navigate between pages
    - Expected: Different tasks shown per page
    - Verification: Page numbers update, task lists change

11. **Items Per Page**
    - Action: Change from 5 to 10 items per page
    - Expected: More tasks shown per page
    - Verification: Pagination controls update

## Negative Test Cases

### Authentication Tests
12. **Invalid Login**
    - Input: username="wrong", password="wrong"
    - Expected: Error message displayed
    - Verification: "Invalid username or password" shown

13. **Empty Login Fields**
    - Input: Submit form with empty fields
    - Expected: Browser validation prevents submission
    - Verification: Required field validation triggers

### Task Creation Tests
14. **Empty Title**
    - Input: Leave title empty, fill other fields
    - Expected: Validation error for title
    - Verification: "Title is required" message shown

15. **Short Title**
    - Input: title="AB" (less than 3 characters)
    - Expected: Validation error
    - Verification: "Title must be at least 3 characters" shown

16. **Empty Description**
    - Input: Leave description empty
    - Expected: Validation error for description
    - Verification: "Description is required" message shown

17. **Short Description**
    - Input: description="short" (less than 10 characters)
    - Expected: Validation error
    - Verification: "Description must be at least 10 characters" shown

### Data Integrity Tests
18. **Delete Non-existent Task**
    - Action: Attempt to delete already deleted task
    - Expected: Graceful handling, no errors
    - Verification: No application crash

19. **Edit Non-existent Task**
    - Action: Attempt to edit deleted task
    - Expected: Graceful handling or redirect
    - Verification: User notified appropriately

## Edge Test Cases

### Data Persistence Tests
20. **Page Refresh**
    - Action: Create tasks, refresh browser
    - Expected: Tasks persist after refresh
    - Verification: Created tasks still visible

21. **Browser Close/Reopen**
    - Action: Close browser, reopen application
    - Expected: User session and data maintained
    - Verification: Still logged in, tasks visible

### UI Responsiveness Tests
22. **Mobile View**
    - Action: Resize browser to mobile width
    - Expected: Interface adapts to mobile layout
    - Verification: Navigation collapses, forms stack properly

23. **Very Long Text**
    - Input: Very long task title and description
    - Expected: Text wraps appropriately, no layout break
    - Verification: UI remains functional

### Filtering Edge Cases
24. **Multiple Filters**
    - Action: Apply status AND priority filters
    - Expected: Tasks match both criteria
    - Verification: Only tasks matching all filters shown

25. **No Results Filter**
    - Action: Apply filter with no matching tasks
    - Expected: "No tasks found" message
    - Verification: Appropriate empty state shown

26. **Clear All Filters**
    - Action: Apply filters, then clear all
    - Expected: All tasks shown again
    - Verification: All filters reset, full task list visible

### Pagination Edge Cases
27. **Last Page with Few Items**
    - Scenario: Navigate to last page with only 1-2 items
    - Expected: Page displays correctly
    - Verification: Pagination controls work properly

28. **Delete All Tasks on Page**
    - Action: Delete all tasks on current page
    - Expected: Navigate to previous page or show empty state
    - Verification: No broken pagination state

## Performance Tests

29. **Large Dataset**
    - Action: Generate demo data multiple times
    - Expected: Interface remains responsive
    - Verification: Filtering and pagination work smoothly

30. **Rapid User Interactions**
    - Action: Quickly click multiple buttons/filters
    - Expected: No duplicate requests or broken state
    - Verification: Application handles rapid interactions gracefully

## Browser Compatibility Tests

31. **Chrome/Edge/Firefox**
    - Action: Test application in different browsers
    - Expected: Consistent functionality across browsers
    - Verification: All features work identically

32. **Local Storage Support**
    - Scenario: Browser with localStorage disabled
    - Expected: Graceful degradation or error handling
    - Verification: User informed of storage requirements

## Security Tests

33. **Protected Routes**
    - Action: Access /dashboard without login
    - Expected: Redirect to login page
    - Verification: Cannot access protected content

34. **Session Persistence**
    - Action: Login, wait, perform actions
    - Expected: Session maintained throughout usage
    - Verification: No unexpected logouts

## Data Validation Tests

35. **XSS Prevention**
    - Input: Enter script tags in form fields
    - Expected: Content escaped/sanitized
    - Verification: No script execution, safe display

36. **Special Characters**
    - Input: Unicode characters, symbols in task data
    - Expected: Characters stored and displayed correctly
    - Verification: International characters work properly

## Test Execution Strategy

1. **Manual Testing**: All positive and negative cases
2. **Browser Testing**: Chrome, Firefox, Edge
3. **Device Testing**: Desktop, tablet, mobile
4. **User Acceptance**: End-to-end user workflows
5. **Regression Testing**: After any code changes

## Success Criteria

- All positive test cases pass
- Negative test cases show appropriate error handling
- Edge cases handled gracefully
- No application crashes or data loss
- Consistent behavior across browsers
- Responsive design works on all devices
