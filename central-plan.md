# Central Plan: The Evolution of Todo

## 1. Project Overview

This document outlines the central plan for the "Evolution of Todo" hackathon project. The project's goal is to build a Todo application that evolves from a simple console application to a full-fledged, AI-powered, cloud-native application. This project will be executed following Spec-Driven Development (SDD) principles, with a strong emphasis on AI-assisted coding and cloud-native architecture.

## 2. Hackathon Phases

The project is divided into five distinct phases, each with its own set of deliverables and technology stack.

*   **Phase I: In-Memory Python Console App:** A simple command-line Todo application that stores tasks in memory. (Completed)
*   **Phase II: Full-Stack Web Application:** The console app is transformed into a multi-user web application with a persistent database. (Completed)
*   **Phase III: AI-Powered Todo Chatbot:** An AI-powered chatbot is added to manage the Todo list through natural language.
*   **Phase IV: Local Kubernetes Deployment:** The application is containerized and deployed on a local Kubernetes cluster.
*   **Phase V: Advanced Cloud Deployment:** The application is deployed to a production-grade Kubernetes cluster on a public cloud, with advanced features like event-driven architecture.

## 3. High-Level Strategy

Our strategy is to follow an iterative and incremental development process, strictly adhering to the phase structure of the hackathon. Each phase will be treated as a mini-project with its own planning, execution, and deliverables. We will use Spec-Driven Development (SDD) to ensure that each phase is well-defined and meets all the requirements of the hackathon.

## 4. Architecture and Workflows

The architecture will evolve with each phase.

*   **Phase I:** A simple, single-tier console application.
-   **Phase II:** A full-stack web application built with Next.js. The FastAPI backend is integrated directly into the Next.js project as serverless functions, deployed as a single unit on Vercel. It connects to a Neon DB database. (Completed)
*   **Phase III:** A three-tier architecture with a frontend, a backend that includes an AI agent, and a database.
*   **Phase IV & V:** A microservices-based architecture, containerized and deployed on Kubernetes.

The workflow will be consistent across all phases and will be based on the principles of Spec-Driven Development.

## 5. Tools and Technologies

The following tools and technologies will be used throughout the project:

| Phase     | Technology Stack                                                                          |
| --------- | ----------------------------------------------------------------------------------------- |
| Phase I   | Python, Gemini CLI, Spec-Kit Plus                                                         |
| Phase II  | Next.js, FastAPI, SQLModel, Neon DB, Better Auth                                          |
| Phase III | OpenAI ChatKit, Agents SDK, Official MCP SDK                                              |
| Phase IV  | Docker, Minikube, Helm, kubectl-ai, kagent                                                |
| Phase V   | Kafka, Dapr, DigitalOcean DOKS                                                            |

## 6. Spec-Driven Development Approach

We will use Spec-Kit Plus to manage our specifications. For each phase and feature, we will create detailed specs that will guide the AI in generating the code. The specs will include user stories, acceptance criteria, and API contracts. This approach will allow us to focus on the "what" and let the AI handle the "how".
