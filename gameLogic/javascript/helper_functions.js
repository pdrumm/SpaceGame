class HelperFunctions {

  static rectIntersects(aCenterX, aCenterY, aWidth, aHeight, bCenterX, bCenterY, bWidth, bHeight) {
    if (HelperFunctions.intersects(aCenterX - aWidth / 2, aCenterX + aWidth / 2, bCenterX - bWidth / 2, bCenterX + bWidth / 2)) {
      if (HelperFunctions.intersects(aCenterY - aHeight / 2, aCenterY + aHeight / 2, bCenterY - bHeight / 2, bCenterY + bHeight / 2)) {
        return true;
      }
    }
    return false;
  }

  static intersects(a1, a2, b1, b2) {
    if (a2 < b1) {
      return false;
    }
    if (a1 > b2) {
      return false;
    }

    return true;
  }
}
