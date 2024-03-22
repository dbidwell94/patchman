# Maintainer: Devin Bidwell <dbidwell94@biddydev.com>
pkgname='patchman-git'
pkgver='0.0.16-1' # Upstream version
pkgrel=1 # PKGBUILD version
pkgdesc="An open source API tester built on Tauri and React"
arch=("x86_64")
url="https://github.com/dbidwell94/patchman"
license=('MIT')
provides=("patchman")

depends=("webkit2gtk" "openssl")
makedepends=("base-devel" "curl" "wget" "file" "appmenu-gtk-module" "gtk3" "libappindicator-gtk3" "librsvg" "libvips" "rustup" "node" "npm" "install")
optdepends=()

changelog='CHANGELOG.md'

source=("patchman-v$pkgver.tar.gz::https://github.com/dbidwell94/patchman/archive/refs/tags/patchman-v$pkgver.tar.gz")

sha256sums=('SKIP')

# prepare() {
# 	cd "$pkgname-$pkgver"
# 	patch -p1 -i "$srcdir/$pkgname-$pkgver.patch"
# }

build() {
	cd "$pkgname-$pkgver"
	npm run tauri build
}

package() {
	cd "$pkgname-$pkgver"/src-tauri/target/release
	install -Dm755 "$pkgname" "$pkgdir/usr/bin/$pkgname"
}
