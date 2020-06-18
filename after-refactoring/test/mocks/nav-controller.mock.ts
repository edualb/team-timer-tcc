import { NavController } from "ionic-angular";

export class NavControllerMock extends NavController {
  
  page: string | import("ionic-angular/umd/navigation/nav-util").Page
  params: any;

  push(page: string | import("ionic-angular/umd/navigation/nav-util").Page, params?: any, opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    return new Promise((resolve) => {
      this.page = page;
      this.params = params;
      resolve();
    })

  }

  insert(insertIndex: number, page: string | import("ionic-angular/umd/navigation/nav-util").Page, params?: any, opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  insertPages(insertIndex: number, insertPages: { page: string | import("ionic-angular/umd/navigation/nav-util").Page; params?: any; }[], opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  pop(opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  popToRoot(opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  popTo(page: string | import("ionic-angular/umd/navigation/nav-util").Page | import("ionic-angular").ViewController, opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  popAll(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  remove(startIndex: number, removeCount?: number, opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  removeView(viewController: import("ionic-angular").ViewController, opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  setRoot(pageOrViewCtrl: string | import("ionic-angular/umd/navigation/nav-util").Page | import("ionic-angular").ViewController, params?: any, opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  goToRoot(options: import("ionic-angular").NavOptions): Promise<any> {
    throw new Error("Method not implemented.");
  }

  setPages(pages: (import("ionic-angular").ViewController | { page: string | import("ionic-angular/umd/navigation/nav-util").Page; params?: any; })[], opts?: import("ionic-angular").NavOptions, done?: import("ionic-angular/umd/navigation/nav-util").TransitionDoneFn): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getByIndex(index: number): import("ionic-angular").ViewController {
    throw new Error("Method not implemented.");
  }

  getActive(includeEntering?: boolean): import("ionic-angular").ViewController {
    throw new Error("Method not implemented.");
  }

  isActive(view: import("ionic-angular").ViewController): boolean {
    throw new Error("Method not implemented.");
  }

  getPrevious(view?: import("ionic-angular").ViewController): import("ionic-angular").ViewController {
    throw new Error("Method not implemented.");
  }

  first(): import("ionic-angular").ViewController {
    throw new Error("Method not implemented.");
  }

  last(): import("ionic-angular").ViewController {
    throw new Error("Method not implemented.");
  }

  indexOf(view: import("ionic-angular").ViewController): number {
    throw new Error("Method not implemented.");
  }

  length(): number {
    throw new Error("Method not implemented.");
  }

  getViews(): import("ionic-angular").ViewController[] {
    throw new Error("Method not implemented.");
  }

  getActiveChildNavs(): any[] {
    throw new Error("Method not implemented.");
  }

  getActiveChildNav() {
    throw new Error("Method not implemented.");
  }

  getAllChildNavs(): any[] {
    throw new Error("Method not implemented.");
  }

  isTransitioning(includeAncestors?: boolean): boolean {
    throw new Error("Method not implemented.");
  }

  canSwipeBack(): boolean {
    throw new Error("Method not implemented.");
  }

  canGoBack(): boolean {
    throw new Error("Method not implemented.");
  }

  registerChildNav(nav: any): void {
    throw new Error("Method not implemented.");
  }

  resize(): void {
    throw new Error("Method not implemented.");
  }

  getType(): string {
    throw new Error("Method not implemented.");
  }

  getSecondaryIdentifier(): string {
    throw new Error("Method not implemented.");
  }
  
}