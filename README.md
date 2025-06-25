# FitLog - A Minimalist Workout Logger

FitLog is a minimalist, mobile-first web application designed for individuals to quickly and efficiently log their daily fitness activities. The primary goal is to provide a frictionless experience for users who want to track their progress in running and weightlifting without the clutter and complexity of mainstream fitness apps.


![Google Chrome 2025-06-25 22 16 31](https://github.com/user-attachments/assets/09b02d83-ce8f-4bbc-8783-d521f6bba62c)


## Core Features

*   **Daily Workout Logging**: Create a new workout entry for a specific date, and add multiple exercises to a single day's log.
*   **Cardio and Strength Training**: Log cardio exercises by specifying the name and duration, and log strength training exercises by entering the weight, reps, and sets.
*   **Quick Add with Parsing**: A "Quick Add" feature that allows users to paste a full workout log as a single block of text, which is then automatically parsed and categorized.
*   **Data Review & Summary**: View a chronological history of all past workout logs, and see a weekly summary report to quickly understand your progress for the week.
*   **Local Storage**: All data is saved in the browser's `localStorage`, so no user account is needed.

## Tech Stack

*   **Frontend**: React, TypeScript
*   **Styling**: Bootstrap, CSS
*   **Linting**: ESLint

## Getting Started

To run the project locally, follow these steps:

1.  Clone the repository:
    ```sh
    git clone git@github.com:kkdai/gym-daily-gemini.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd gym-daily-gemini
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Start the development server:
    ```sh
    npm start
    ```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
