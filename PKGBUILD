# Maintainer: Devin Bidwell <dbidwell94@biddydev.com>
pkgname='patchman-bin'
pkgver='0.0.16' # Upstream version
pkgrel=1 # PKGBUILD version
pkgdesc="An open source API tester built on Tauri and React"
arch=("x86_64")
url="https://github.com/dbidwell94/patchman"
license=('MIT')
provides=("patchman")

depends=("webkit2gtk" "openssl")
optdepends=()

changelog='CHANGELOG.md'

source=("https://github.com/dbidwell94/patchman/archive/refs/tags/patchman-v$pkgver.deb")

sha256sums=('SKIP')

package() {
	bsdtar -xf "$srcdir/data.tar.gz" -C "$pkgdir"
}