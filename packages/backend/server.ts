// server.ts
import express, { Application, Router } from "express";

type ControllerMap = Record<string, any>;
type RouteFactory = (getController: <T>(controllerClass: new (...args: any[]) => T) => T) => Router;

export class Server {
  private controllers: ControllerMap = {};
  private app: Application;
  private routes: RouteFactory[] = [];
  private port: number;

  constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
    this.app.use(express.json());
  }

  getApp(): Application {
    return this.app;
  }

  setController<T>(controllerClass: new (...args: any[]) => T, controller: T): void {
    this.controllers[controllerClass.name] = controller;
  }

  getController<T>(controllerClass: new (...args: any[]) => T): T {
    const controller = this.controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller as T;
  }

  addRoute(route: RouteFactory): void {
    this.routes.push(route);
  }

  configureRoutes(): void {
    this.routes.forEach((route) => this.app.use(route(this.getController.bind(this))));
  }

  launch(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}